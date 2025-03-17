package com.diy.playlist_transfer.dto;

import java.util.List;

public class SpotifyArtistDTO {

    private String name;
    private List<String> genres;
    private String imageUrl;

    public SpotifyArtistDTO(String name, List<String> genres, String imageUrl) {
        this.name = name;
        this.genres = genres;
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
