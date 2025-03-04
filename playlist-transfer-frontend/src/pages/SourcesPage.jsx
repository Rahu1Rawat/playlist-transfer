import LogoBar from "../components/LogoBar.jsx";
import {TextField} from "@mui/material";
import SourceCard from "../components/SourceCard.jsx";
import spotifyLogo from "../assets/images/Spotify Logo.png"
import amLogo from "../assets/images/Apple-Music-Logo.png"
import {useCallback, useEffect} from "react";

function SourcesPage() {

    const handleAuthMessage = useCallback((event) => {
        if (event.origin !== "http://localhost:8080") return;
        if (event.data === "authenticated") {
            window.location.href = "/select-playlists";
        }
    }, []);

    useEffect(() => {
        window.addEventListener("message", handleAuthMessage)

        return () => {
            // Cleanup listener when the component unmounts
            window.removeEventListener("message", handleAuthMessage);
        };
    }, [handleAuthMessage]);

    const handleSpotifyClick = () => {
        const width = 500
        const height = 600
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        window.open(
            "http://localhost:8080/spotify/authorize",
            "Spotify Login",
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
        );
    }

    return <div className="bg-customBlue min-h-screen">
        <div>
            <LogoBar/>
        </div>
        <div className="flex flex-col items-center gap-7">
            <div>
                <p className="text-white text-6xl font-bold">Select the source</p>
            </div>
            <div>
                <p className="text-white font-semibold">STEP 1/4</p>
            </div>
            <div>
                <TextField placeholder="Search a platform" sx={{
                    width: "380px",
                    backgroundColor: "#3c4157",
                    borderRadius: "15px",
                    "& .MuiInputBase-input": {color: "white"},
                    // Remove default outline
                    "& .MuiOutlinedInput-notchedOutline": {border: "none"},
                }}/>
            </div>
            <div className="flex gap-7">
                <SourceCard imgSrc={spotifyLogo} altText="Spotify Logo" onClick={handleSpotifyClick}/>
                <SourceCard imgSrc={amLogo} altText="Apple Music Logo"/>
            </div>
        </div>
    </div>
}

export default SourcesPage;