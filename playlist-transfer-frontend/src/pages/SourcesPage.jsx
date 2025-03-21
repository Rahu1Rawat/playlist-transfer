import LogoBar from "../components/LogoBar.jsx";
import { TextField } from "@mui/material";
import spotifyLogo from "../assets/images/Spotify Logo.png";
import YTMLogo from "../assets/images/YouTube-Music-Logo.png"
import { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../contexts/AppContext.jsx";
import PlatformCard from "../components/PlatformCard.jsx"; // Import your unified component

export function SourcesPage() {

    const { source, setSource } = useAppContext(); // Destructure both source and setter
    const navigate = useNavigate();

    const handleAuthMessage = useCallback((event) => {
        if (event.origin !== "http://localhost:8080") return;
        if (event.data === "authenticated") {
            navigate("/select-playlists");
        }
    }, [navigate]);

    useEffect(() => {
        window.addEventListener("message", handleAuthMessage);
        return () => {
            window.removeEventListener("message", handleAuthMessage);
        };
    }, [handleAuthMessage]);

    const handleSpotifyClick = () => {
        setSource('spotify');

        const width = 500;
        const height = 600;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        window.open(
            "http://localhost:8080/spotify/authorize",
            "Spotify Login",
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
        );
    };

    // Yet to be implemented
    // const handleYTMClick = () => {
    //     setSource('YTMusic');
    //
    //     const width = 500;
    //     const height = 600;
    //     const left = (screen.width - width) / 2;
    //     const top = (screen.height - height) / 2;
    //
    //     window.open(
    //         "http://localhost:8080/?/?",
    //         "YTMusic Login",
    //         `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    //     );
    // };

    return (
        <div className="bg-customBlue min-h-screen">
            <LogoBar />
            <div className="flex flex-col items-center gap-7">
                <div>
                    <p className="text-white text-6xl font-bold">
                        Select the source
                    </p>
                </div>
                <div>
                    <TextField placeholder="Search a platform" sx={{
                        width: "380px",
                        backgroundColor: "#3c4157",
                        borderRadius: "15px",
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    }} />
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
                        altText="YTMLogo"
                        // onClick={handleYTMClick}
                    />
                </div>
            </div>
        </div>
    );
}
