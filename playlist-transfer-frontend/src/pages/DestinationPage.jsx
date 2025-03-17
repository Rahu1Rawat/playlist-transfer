import LogoBar from "../components/LogoBar.jsx";
import {TextField} from "@mui/material";
import spotifyLogo from "../assets/images/Spotify Logo.png";
import amLogo from "../assets/images/Apple-Music-Logo.png";
import SelectedSourceCard from "../components/SelectedSourceCard.jsx";

const DestinationPage = () => {
    return (
        <div className="bg-customBlue min-h-screen">
            <LogoBar/>
            <div className="flex flex-col items-center gap-7">
                <div>
                    <p className="text-white text-6xl font-bold">
                        Select The Destination
                    </p>
                </div>
                <div>
                    <TextField placeholder="Search a platform" sx={{
                        width: "380px",
                        backgroundColor: "#3c4157",
                        borderRadius: "15px",
                        "& .MuiInputBase-input": {color: "white"},
                        "& .MuiOutlinedInput-notchedOutline": {border: "none"},
                    }}/>
                </div>
                <div className="flex gap-7">
                    <SelectedSourceCard
                        imgSrc={spotifyLogo}
                        altText="Spotify Logo"
                        // onClick={handleSpotifyClick}
                    />
                    <SelectedSourceCard
                        imgSrc={amLogo}
                        altText="Apple Music Logo"
                        // onClick={handleAMClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default DestinationPage;