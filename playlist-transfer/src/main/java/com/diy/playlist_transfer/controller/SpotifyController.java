package com.diy.playlist_transfer.controller;

import com.diy.playlist_transfer.dto.SpotifyAlbumDTO;
import com.diy.playlist_transfer.dto.SpotifyArtistDTO;
import com.diy.playlist_transfer.dto.SpotifyPlaylistDTO;
import com.diy.playlist_transfer.dto.SpotifySavedTracksDTO;
import com.diy.playlist_transfer.service.SpotifyAuthService;
import com.diy.playlist_transfer.service.SpotifyPlaylistService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import reactor.core.publisher.Mono;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/spotify")
public class SpotifyController {

    private static final String AUTH_URL = "https://accounts.spotify.com/authorize?";
    private final SpotifyAuthService spotifyService;
    private final SpotifyPlaylistService spotifyPlaylistService;

    public SpotifyController(SpotifyAuthService spotifyAuthService, SpotifyPlaylistService spotifyPlaylistService) {
        this.spotifyService = spotifyAuthService;
        this.spotifyPlaylistService = spotifyPlaylistService;
    }

    // ! User visits http://localhost:8080/spotify/authorize
    //   User logs into Spotify
    //   Spotify validates the request
    //   Spotify generates an authorization code
    //   Redirects back to your application with the code
    @GetMapping("/authorize")
    public RedirectView authorize(HttpSession session) {

        session.invalidate();

        String authorizationUrl = AUTH_URL +
                "response_type=code" +
                "&client_id=0ec373d0dd754676a50590bcf1dc5646" +
                "&scope=playlist-read-private playlist-read-collaborative user-library-read user-follow-read" +
                "&redirect_uri=http://localhost:8080/spotify/auth/callback" +
                "&state=random_state";

        return new RedirectView(authorizationUrl);
    }

    // ! Spotify redirects to: http://localhost:8080/spotify/auth/callback?code=XXXX&state=random_state
    //   Spring extracts the code using @RequestParam
    //   Passes code to requestAccessToken()
    @GetMapping("/auth/callback")
    public ResponseEntity<String> handleCallback(@RequestParam("code") String code,
                                                 @RequestParam("state") String state,
                                                 HttpSession session) {
        return spotifyService.getAccessToken(code)
                .map(accessToken -> {
                    System.out.println("Access Token: " + accessToken);
                    session.setAttribute("spotifyAccessToken", accessToken);
                    // Return an HTML page that will notify the main app and close the popup
                    String htmlResponse = """
                            <html>
                            <body>
                                <script>
                                    window.opener.postMessage("authenticated", "http://localhost:5173");
                                    window.close();
                                </script>
                            </body>
                            </html>
                            """;
                    return ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(htmlResponse);
                })
                .block();

    }

    @GetMapping("/playlists")
    public Mono<List<SpotifyPlaylistDTO>> getUserPlaylists(HttpSession session) {
        String accessToken = (String) session.getAttribute("spotifyAccessToken");

        if (accessToken == null) {
            return Mono.error(new RuntimeException("No access token found"));
        }

        return spotifyPlaylistService.getUserPlaylists(accessToken)
                .onErrorResume(e->{
                    System.err.println("Spotify API error: " + e.getMessage());
                    return Mono.error(new RuntimeException("Error fetching playlists: " + e.getMessage()));
                });
    }

    @GetMapping("/albums")
    public Mono<ResponseEntity<List<SpotifyAlbumDTO>>> getUserSavedAlbums(HttpSession session) {
        String accessToken = (String) session.getAttribute("spotifyAccessToken");

        if (accessToken == null) {
            return Mono.just(ResponseEntity.status(401).build());
        }

        return spotifyPlaylistService.getUserSavedAlbums(accessToken)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> {
                    System.err.println("Spotify API error: " + e.getMessage());
                    return Mono.just(ResponseEntity.status(500).build());
                });
    }

    @GetMapping("/tracks")
    public Mono<ResponseEntity<List<SpotifySavedTracksDTO>>> getUserSavedTracks(HttpSession session){
        String accessToken = (String) session.getAttribute("spotifyAccessToken");

        if(accessToken == null) {
            return Mono.just(ResponseEntity.status(401).build());
        }
        return spotifyPlaylistService.getUserSavedTracks(accessToken)
                .map(tracks -> ResponseEntity.ok(tracks))
                .onErrorResume(e -> {
                    System.out.println("Spotify API error: " + e.getMessage());
                    return Mono.just(ResponseEntity.status(500).build());
                });

    }

    @GetMapping("/artists")
    public Mono<ResponseEntity<List<SpotifyArtistDTO>>> getUserFavoriteArtists(HttpSession session) {
        String accessToken = (String) session.getAttribute("spotifyAccessToken");

        if(accessToken == null) {
            return Mono.just(ResponseEntity.status(401).build());
        }

        return spotifyPlaylistService.getUserFavoriteArtists(accessToken)
                .map(artists -> ResponseEntity.ok(artists))
                .onErrorResume(e -> {
                    System.out.println("Spotify API error: " + e.getMessage());
                    return Mono.just(ResponseEntity.status(500).build());
                });
    }

}
