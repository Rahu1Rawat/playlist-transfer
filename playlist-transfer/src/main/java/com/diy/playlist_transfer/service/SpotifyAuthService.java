package com.diy.playlist_transfer.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

// * Handle Spotify API Logic
@Service
public class SpotifyAuthService {

    private static final String TOKEN_URL = "https://accounts.spotify.com/api/token";
    private final WebClient webClient;

    public SpotifyAuthService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> getAccessToken(String code){
        return requestAccessToken(code)
                .map(this::extractAccessToken);
    }

    // ! Makes POST request to Spotify's token endpoint
    //   Uses WebClient for reactive HTTP request
    //   Includes form parameters from createTokenRequestParams
    //   Returns response as reactive Mono
    private Mono<Map<String, Object>> requestAccessToken(String code) {
        return webClient.post()
                .uri(TOKEN_URL)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(createTokenRequestParams(code)))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                });
    }

    // ! Creates form parameters required by Spotify's token endpoint
    //   Includes authorization code, client credentials, and redirect URI
    public MultiValueMap<String, String> createTokenRequestParams(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("redirect_uri", "http://localhost:8080/spotify/auth/callback");
        params.add("client_id", "0ec373d0dd754676a50590bcf1dc5646");
        params.add("client_secret", "14d3d8c5aad3466eb082eb5775f9398d");
        return params;
    }

    // ! Extracts access token from Spotify's response
    //   Throws exception if token is not found
    private String extractAccessToken(Map<String, Object> response){
        if(response != null && response.containsKey("access_token")){
            return (String) response.get("access_token");
        }
        throw new RuntimeException("Failed to retrieve access token");
    }
}
