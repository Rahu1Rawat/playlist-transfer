import LogoBar from "../components/LogoBar.jsx";
import {Avatar, Checkbox} from "@mui/material";
import SpotifyPlaylistCard from "../components/SpotifyPlaylistCard.jsx";
import {useEffect, useState} from "react";

function MovePlaylistPage() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8080/spotify/playlists", {
            credentials: "include" // This is critical to include session cookies
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch playlists");
                }
                return response.json();
            })
            .then((data) => {
                setPlaylists(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching playlists:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="bg-customBlue text-white min-h-screen">
                <LogoBar/>
                <div className="flex flex-col items-center justify-center h-[80vh]">
                    <p className="text-2xl mb-4">Loading playlists...</p>
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-customBlue text-white min-h-screen">
                <LogoBar/>
                <div className="flex flex-col items-center justify-center h-[80vh]">
                    <p className="text-2xl mb-4">Error loading playlists</p>
                    <p className="text-red-400">{error}</p>
                    <button
                        className="mt-4 bg-buttonBlue px-6 py-2 rounded-full"
                        onClick={() => window.location.href = "/sources"}
                    >
                        Return to Source Selection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-customBlue text-white min-h-screen">
            <div>
                <LogoBar/>
            </div>
            <div className="flex flex-col items-center gap-8 pb-8">
                <div>
                    <p className="text-6xl font-bold">Select Playlist to move</p>
                </div>
                <div>
                    <p className="font-semibold">STEP 2/4</p>
                </div>
                <div className="bg-logoBarBlue rounded-xl w-[745px]">
                    <div className="pt-3 pl-3 pb-3">
                        <p className="text-2xl font-bold">From your spotify account</p>
                    </div>
                    <div className="flex justify-between bg-customGrey items-center p-3">
                        <div className="flex gap-3 items-center">
                            <div>
                                <Checkbox sx={{p: 0}} defaultChecked/>
                            </div>
                            <div>
                                <Avatar variant="square"/>
                            </div>
                            <div>
                                <p className="font-semibold">My Spotify music library</p>
                            </div>
                        </div>
                        <div>
                            <p>{playlists.length > 0 ? playlists[0].ownerName : "Unknown Owner"}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        {playlists && playlists.length > 0 ? (
                            playlists.map((playlist) => (
                                <SpotifyPlaylistCard
                                    key={playlist.id}
                                    name={playlist.name}
                                    trackCount={playlist.trackCount}
                                    imageUrl={playlist.imageUrl}
                                />
                            ))
                        ) : (
                            <div className="p-4 text-center">
                                No playlists found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovePlaylistPage;