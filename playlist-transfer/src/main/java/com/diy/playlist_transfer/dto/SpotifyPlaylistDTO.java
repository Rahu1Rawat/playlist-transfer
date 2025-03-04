package com.diy.playlist_transfer.dto;

public class SpotifyPlaylistDTO {

    private String id;
    private String name;
    private String description;
    private boolean collaborative;
    private boolean isPublic;
    private String imageUrl;
    private String ownerName;
    private int trackCount;

    public SpotifyPlaylistDTO(String id, String name, String description, boolean collaborative, boolean isPublic, String imageUrl, String ownerName, int trackCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.collaborative = collaborative;
        this.isPublic = isPublic;
        this.imageUrl = imageUrl;
        this.ownerName = ownerName;
        this.trackCount = trackCount;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCollaborative() {
        return collaborative;
    }

    public void setCollaborative(boolean collaborative) {
        this.collaborative = collaborative;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public int getTrackCount() {
        return trackCount;
    }

    public void setTrackCount(int trackCount) {
        this.trackCount = trackCount;
    }
}
