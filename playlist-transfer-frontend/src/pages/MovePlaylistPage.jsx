import useSpotifyData from "../hooks/useSpotifyData.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ErrorScreen from "../components/ErrorScreen.jsx";
import LogoBar from "../components/LogoBar.jsx";
import CustomButton from "../components/CustomButton.jsx";
import {LibrarySection} from "../components/LibrarySection.jsx";

function MovePlaylistPage() {
    const { data: playlists, error: playlistError } = useSpotifyData("playlists");
    const { data: albums, error: albumsError } = useSpotifyData("albums");
    const { data: tracks, error: tracksError } = useSpotifyData("tracks");
    const { data: artists, error: artistsError } = useSpotifyData("artists");

    const error = playlistError || albumsError || tracksError || artistsError;

    const loading =
        !playlists.length &&
        !albums.length &&
        !tracks.length &&
        !artists.length &&
        !error;

    // Error handling.
    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen message={error} />;

    return (
        <div className="bg-customBlue text-white min-h-screen">
            <LogoBar />
            <CustomButton />
            <div className="flex flex-col items-center gap-8 pb-8">
                <div className="mt-3">
                    <p className="font-bold text-5xl">Select playlist to move</p>
                </div>
                {/* Removed step display */}
                <div>
                    <LibrarySection
                        playlists={playlists}
                        albums={albums}
                        tracks={tracks}
                        artists={artists}
                    />
                </div>
            </div>
        </div>
    );
}

export default MovePlaylistPage;
