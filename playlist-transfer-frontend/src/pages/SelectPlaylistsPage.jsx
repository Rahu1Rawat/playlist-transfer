import LogoBar from "../components/LogoBar.jsx";
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

function SelectPlaylistsPage() {
    const navigate = useNavigate();

    return <div>
        <div>
            <LogoBar/>
        </div>
        <div className="bg-customBlue min-h-screen text-white flex flex-col items-center gap-9">
            <div>
                <p className="text-6xl font-bold">Select playlists to move</p>
            </div>
            <div>
                <p className="font-semibold">STEP 2/4</p>
            </div>
            <div className="flex flex-col gap-8 rounded-3xl bg-logoBarBlue">
                <div className="flex justify-center">
                    <div className="pt-6">
                        <p className="text-4xl font-bold">Spotify Playlist</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-6 p-6">
                    <div>
                        <button className="bg-buttonBlue w-64 h-14 text-white rounded-full"
                                onClick={() => navigate("/move-playlists")}>
                            Load from spotify account
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-20 w-[2px] bg-white"></div>
                        <div>
                            <p className="font-semibold text-2xl">or</p>
                        </div>
                        <div className="h-20 w-[2px] bg-white"></div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div>
                            <p>Copy Spotify playlist URL and paste here:</p>
                        </div>
                        <div>
                            <TextField placeholder="Paste Spotify playlist URL here" sx={{
                                width: "384px",
                                backgroundColor: "#3c4157",
                                borderRadius: "15px",
                                "& .MuiInputBase-input": {color: "white"}, // Remove default outline
                                "& .MuiOutlinedInput-notchedOutline": {border: "none"},
                            }}/>
                        </div>
                        <div>
                            <button className="bg-buttonBlue w-96 h-14 text-white rounded-full">Load from URL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SelectPlaylistsPage;