package com.diy.playlist_transfer.service;

import com.diy.playlist_transfer.dto.SpotifyPlaylistDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SpotifyPlaylistService {

    private final WebClient webClient;
    private static final String API_BASE_URL = "https://api.spotify.com/v1";

    public SpotifyPlaylistService(WebClient webClient) {
        this.webClient = webClient;
    }

    @SuppressWarnings("unchecked")
    public SpotifyPlaylistDTO convertToDTO(Map<String, Object> playlistResponse) {
        List<Map<String, Object>> images = playlistResponse.get("images") instanceof List<?> ?
                (List<Map<String, Object>>) playlistResponse.get("images") : null;

        Map<String, Object> owner = playlistResponse.get("owner") instanceof Map<?, ?> ?
                (Map<String, Object>) playlistResponse.get("owner") : null;

        Map<String, Object> tracks = playlistResponse.get("tracks") instanceof Map<?, ?> ?
                (Map<String, Object>) playlistResponse.get("tracks") : null;

        String imageUrl = null;
        if (images != null && !images.isEmpty() && images.get(0) != null) {
            imageUrl = (String) images.get(0).get("url");
        }

        String ownerName = owner != null ? (String) owner.get("display_name") : null;
        int trackCount = tracks != null ? ((Number) tracks.get("total")).intValue() : 0;

        return new SpotifyPlaylistDTO(
                (String) playlistResponse.get("id"),
                (String) playlistResponse.get("name"),
                (String) playlistResponse.get("description"),
                (Boolean) playlistResponse.get("collaborative"),
                (Boolean) playlistResponse.get("public"),
                imageUrl,
                ownerName,
                trackCount
        );
    }

    public Mono<List<SpotifyPlaylistDTO>> getUserPlaylists(String accessToken) {
        return webClient.get()
                .uri(API_BASE_URL + "/me/playlists")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .map(response -> {
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
                    return items.stream()
                            .map(this::convertToDTO) // The method reference .map(this::convertToDTO) is equivalent to:
                            .toList(); // .map(playlistItem -> this.convertToDTO(playlistItem))
                })
                .doOnSuccess(playlists -> log.info("Successfully fetched {} playlists", playlists.size()))
                .doOnError(error -> log.error("Error fetching playlists", error));
    }



}
