package com.diy.playlist_transfer.dto;

import java.util.List;

public class SpotifyAlbumDTO {
    private String addedAt;
    private AlbumInfo album;

    // Getters and Setters
    public String getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(String addedAt) {
        this.addedAt = addedAt;
    }

    public AlbumInfo getAlbum() {
        return album;
    }

    public void setAlbum(AlbumInfo album) {
        this.album = album;
    }

    // Nested AlbumInfo Class
    public static class AlbumInfo {
        private String id;
        private String name;
        private String releaseDate;
        private List<Image> images;
        private List<Artist> artists;

        // Getters and Setters
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getReleaseDate() {
            return releaseDate;
        }

        public void setReleaseDate(String releaseDate) {
            this.releaseDate = releaseDate;
        }

        public List<Image> getImages() {
            return images;
        }

        public void setImages(List<Image> images) {
            this.images = images;
        }

        public List<Artist> getArtists() {
            return artists;
        }

        public void setArtists(List<Artist> artists) {
            this.artists = artists;
        }
    }

    // Nested Image Class
    public static class Image {
        private String url;

        // Getters and Setters
        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    // Nested Artist Class
    public static class Artist {
        private String name;

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
