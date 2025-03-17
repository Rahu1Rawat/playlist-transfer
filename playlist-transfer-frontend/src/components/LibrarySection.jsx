import SpotifyAlbumsAccordion from "./SpotifyAlbumsAccordion.jsx";
import FavoriteSongsAccordion from "./FavoriteSongsAccordion.jsx";
import FavoriteArtistsAccordion from "./FavoriteArtistsAccordion.jsx";
import SpotifyPlaylistCard from "./SpotifyPlaylistCard.jsx";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SearchBar from "./SearchBar.jsx";
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import SpotifyLogoN from "../assets/images/Spotify-Logo.jpg";
import {useState} from "react";

export function LibrarySection({playlists, albums, tracks, artists}) {
    // === Lifted state ===
    const [selectedAlbums, setSelectedAlbums] = useState(new Set());
    const [selectedTracks, setSelectedTracks] = useState(new Set());
    const [selectedArtists, setSelectedArtists] = useState(new Set());

    // === Handler for global checkbox ===
    const isEverythingSelected =
        selectedAlbums.size === albums.length &&
        selectedTracks.size === tracks.length &&
        selectedArtists.size === artists.length;

    const handleGlobalCheckboxChange = () => {
        if (isEverythingSelected) {
            // Deselect everything
            setSelectedAlbums(new Set());
            setSelectedTracks(new Set());
            setSelectedArtists(new Set());
        } else {
            // Select everything
            setSelectedAlbums(new Set(albums.map(album => album.album.id)));
            setSelectedTracks(new Set(tracks.map(track => track.id)));
            setSelectedArtists(new Set(artists.map(artist => artist.name)));
        }
    };

    return (
        <div className="bg-logoBarBlue rounded-xl w-[745px]">
            <div className="pt-3 pl-3 pb-3">
                <p className="text-2xl font-bold">From your spotify account</p>
            </div>
            <div className="flex justify-between bg-customGrey items-center p-3">
                <div className="flex gap-3 items-center">
                    <Checkbox
                        sx={{p: 0, color:"white"}}
                        checked={isEverythingSelected}
                        indeterminate={
                            !isEverythingSelected &&
                            (selectedAlbums.size > 0 ||
                                selectedTracks.size > 0 ||
                                selectedArtists.size > 0)
                        }
                        onChange={handleGlobalCheckboxChange}
                    />
                    <Avatar
                        variant="square"
                        src={SpotifyLogoN}
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "5px",
                        }}
                    />
                    <p className="font-semibold">My Spotify music library</p>
                </div>
                <p>{playlists.length > 0 ? playlists[0].ownerName : "Unknown Owner"}</p>
            </div>

            {/* Pass selection props down to accordions */}
            <SpotifyAlbumsAccordion
                albums={albums}
                selectedAlbums={selectedAlbums}
                setSelectedAlbums={setSelectedAlbums}
            />
            <FavoriteSongsAccordion
                tracks={tracks}
                selectedTracks={selectedTracks}
                setSelectedTracks={setSelectedTracks}
            />
            <FavoriteArtistsAccordion
                artists={artists}
                selectedArtists={selectedArtists}
                setSelectedArtists={setSelectedArtists}
            />

            <div className="flex justify-between bg-customGrey items-center p-3">
                <div className="flex gap-3 items-center">
                    <QueueMusicIcon/>
                    <p className="font-semibold">Playlist ({playlists.length})</p>
                    <SearchBar/>
                </div>
            </div>
            <div className="w-full">
                {playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <SpotifyPlaylistCard
                            key={playlist.id}
                            name={playlist.name}
                            trackCount={playlist.trackCount}
                            imageUrl={playlist.imageUrl}
                        />
                    ))
                ) : (
                    <div className="p-4 text-center">No playlists found</div>
                )}
            </div>
        </div>
    );
}
