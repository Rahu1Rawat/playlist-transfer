package com.diy.playlist_transfer.service;

import com.diy.playlist_transfer.dto.SpotifyAlbumDTO;
import com.diy.playlist_transfer.dto.SpotifyArtistDTO;
import com.diy.playlist_transfer.dto.SpotifyPlaylistDTO;
import com.diy.playlist_transfer.dto.SpotifySavedTracksDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.Objects;

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
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
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

    public Mono<List<SpotifyAlbumDTO>> getUserSavedAlbums(String accessToken) {
        return webClient.get()
                .uri(API_BASE_URL + "/me/albums")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .map(response -> {
                    List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
                    if (items == null) return List.of(); // Ensure no null pointer exceptions

                    return items.stream()
                            .map(item -> {
                                SpotifyAlbumDTO dto = new SpotifyAlbumDTO();
                                dto.setAddedAt((String) item.get("added_at"));

                                // Extract album map
                                Map<String, Object> albumMap = (Map<String, Object>) item.get("album");
                                if (albumMap == null) return null; // Avoid errors

                                // Create and populate AlbumInfo
                                SpotifyAlbumDTO.AlbumInfo albumInfo = new SpotifyAlbumDTO.AlbumInfo();
                                albumInfo.setId((String) albumMap.get("id"));
                                albumInfo.setName((String) albumMap.get("name"));
                                albumInfo.setReleaseDate((String) albumMap.get("release_date"));

                                // Convert images
                                List<Map<String, Object>> imageMaps = (List<Map<String, Object>>) albumMap.get("images");
                                if (imageMaps != null) {
                                    List<SpotifyAlbumDTO.Image> images = imageMaps.stream()
                                            .map(img -> {
                                                SpotifyAlbumDTO.Image image = new SpotifyAlbumDTO.Image();
                                                image.setUrl((String) img.get("url"));
                                                return image;
                                            })
                                            .toList();
                                    albumInfo.setImages(images);
                                }

                                // Convert artists
                                List<Map<String, Object>> artistMaps = (List<Map<String, Object>>) albumMap.get("artists");
                                if (artistMaps != null) {
                                    List<SpotifyAlbumDTO.Artist> artists = artistMaps.stream()
                                            .map(artist -> {
                                                SpotifyAlbumDTO.Artist a = new SpotifyAlbumDTO.Artist();
                                                a.setName((String) artist.get("name"));
                                                return a;
                                            })
                                            .toList();
                                    albumInfo.setArtists(artists);
                                }

                                dto.setAlbum(albumInfo);
                                return dto;
                            })
                            .filter(Objects::nonNull) // Remove null values
                            .toList();
                });
    }

    public Mono<List<SpotifySavedTracksDTO>> getUserSavedTracks(String accessToken) {
        return webClient.get()
                .uri(API_BASE_URL + "/me/tracks")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .map(response -> {
                    List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
                    if (items == null || items.isEmpty()) {
                        return List.of();
                    }

                    return items.stream()
                            .map(item -> {
                                Map<String, Object> track = (Map<String, Object>) item.get("track");
                                if (track == null) {
                                    return null;
                                }

                                String id = (String) track.get("id");
                                String trackName = (String) track.get("name");

                                List<Map<String, Object>> artistsList = (List<Map<String, Object>>) track.get("artists");
                                List<String> artistNames = artistsList.stream()
                                        .map(artist -> (String) artist.get("name"))
                                        .toList();

                                Map<String, Object> album = (Map<String, Object>) track.get("album");

                                List<Map<String, Object>> imagesList = (List<Map<String, Object>>) album.get("images");

                                String albumImageUrl = null;
                                if (imagesList != null && !imagesList.isEmpty()) {
                                    albumImageUrl = (String) imagesList.get(0).get("url");
                                }
                                return new SpotifySavedTracksDTO(id, trackName, artistNames, albumImageUrl);
                            })
                            .toList();
                });

    }

    public Mono<List<SpotifyArtistDTO>> getUserFavoriteArtists(String accessToken) {

        return webClient.get()
                .uri(API_BASE_URL + "/me/following?type=artist")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .map(response -> {
                    System.out.println("Spotify API Response for Artists: " + response);
                    Map<String, Object> artistsMap = (Map<String, Object>) response.get("artists");
                    if (artistsMap == null || artistsMap.isEmpty()) {
                        return List.of();
                    }
                    List<Map<String, Object>> items = (List<Map<String, Object>>) artistsMap.get("items");
                    if (items == null || items.isEmpty()) {
                        return List.of();
                    }

                    return items.stream()
                            .map(item -> {
                                String name = (String) item.get("name");
                                List<String> genres = (List<String>) item.get("genres");

                                String imageUrl = null;
                                List<Map<String, Object>> images = (List<Map<String, Object>>) item.get("images");
                                if (images != null && !images.isEmpty()) {
                                    imageUrl = (String) images.get(0).get("url");
                                }

                                return new SpotifyArtistDTO(name, genres, imageUrl);
                            })
                            .toList();
                });
    }

}
