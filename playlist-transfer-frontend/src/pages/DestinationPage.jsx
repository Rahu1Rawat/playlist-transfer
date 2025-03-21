import { useEffect } from "react"; // Import useEffect
import LogoBar from "../components/LogoBar.jsx";
import { TextField } from "@mui/material";
import spotifyLogo from "../assets/images/Spotify Logo.png";
import YTMLogo from "../assets/images/YouTube-Music-Logo.png";
import PlatformCard from "../components/PlatformCard.jsx";
import { useAppContext } from "../contexts/AppContext.jsx";
import CustomButton from "../components/CustomButton.jsx";

const DestinationPage = () => {
    const { source, destination, setDestination, selectedPlaylists, selectedAlbums, selectedTracks, selectedArtists } = useAppContext();

    // Log the selected data when the component mounts or when the data changes
    useEffect(() => {
        console.log("Selected Playlists:", Array.from(selectedPlaylists));
        console.log("Selected Albums:", Array.from(selectedAlbums));
        console.log("Selected Tracks:", Array.from(selectedTracks));
        console.log("Selected Artists:", Array.from(selectedArtists));
    }, [selectedPlaylists, selectedAlbums, selectedTracks, selectedArtists]);


    const handleSpotifyClick = () => {
        setDestination("spotify");
    };

    const handleYTMusicClick = () => {
        setDestination("YTMusic");
    };

    return (
        <div className="bg-customBlue min-h-screen">
            <LogoBar />
            <CustomButton text="Start Transfer" />
            <div className="flex flex-col items-center gap-7">
                <div>
                    <p className="text-white text-6xl font-bold">
                        Select The Destination
                    </p>
                </div>
                <div>
                    <TextField
                        placeholder="Search a platform"
                        sx={{
                            width: "380px",
                            backgroundColor: "#3c4157",
                            borderRadius: "15px",
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        }}
                    />
                </div>
                <div className="flex gap-7">
                    <PlatformCard
                        platformId="spotify"
                        source={source}
                        imgSrc={spotifyLogo}
                        altText="Spotify Logo"
                        onClick={handleSpotifyClick}
                    />

                    <PlatformCard
                        platformId="YTMusic"
                        source={source}
                        imgSrc={YTMLogo}
                        altText="YTMusic Logo"
                        onClick={handleYTMusicClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default DestinationPage;