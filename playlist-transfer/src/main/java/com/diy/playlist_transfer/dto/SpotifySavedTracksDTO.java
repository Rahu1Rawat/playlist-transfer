package com.diy.playlist_transfer.dto;

import java.util.List;

public class SpotifySavedTracksDTO {
    private String id;
    private String trackName;
    private List<String> artistNames;
    private String albumImageUrl;

    public SpotifySavedTracksDTO(String id, String trackName, List<String> artistNames, String albumImageUrl) {
        this.id = id;
        this.trackName = trackName;
        this.artistNames = artistNames;
        this.albumImageUrl = albumImageUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    public List<String> getArtistNames() {
        return artistNames;
    }

    public void setArtistNames(List<String> artistNames) {
        this.artistNames = artistNames;
    }

    public String getAlbumImageUrl() {
        return albumImageUrl;
    }

    public void setAlbumImageUrl(String albumImageUrl) {
        this.albumImageUrl = albumImageUrl;
    }
}
