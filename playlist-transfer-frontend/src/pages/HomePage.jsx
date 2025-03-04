import LogoBar from "../components/LogoBar.jsx";
import spotifyLogo from "../assets/images/Spotify Logo.png"
import apLogo from "../assets/images/Apple-Music-Logo.png"
import ytmLogo from "../assets/images/YouTube-Music-Logo.png"
import soundcloudLogo from "../assets/images/soundcloud-white-logo.png"
import amLogo from "../assets/images/amazon-music-logo.png"
import {useNavigate} from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate("/sources")
    }

    return <div className="bg-customBlue flex flex-col items-center text-center gap-7 min-h-screen">
        <LogoBar/>
        <div className="flex justify-center max-w-4xl">
            <h1 className="text-white text-7xl">Transfer Playlist Between Music Services</h1>
        </div>
        <div className="flex items-center justify-center gap-8">
            <div className="w-32">
                <img className="filter invert brightness-[25%]" src={spotifyLogo} alt="Spotify Logo"/>
            </div>
            <div className="w-32">
                <img className="filter invert brightness-[25%]" src={apLogo} alt="Apple Music Logo"/>
            </div>
            <div className="w-32">
                <img className="filter invert brightness-[25%]" src={ytmLogo} alt="YouTube Music Logo"/>
            </div>
            <div className="w-32">
                <img className="filter invert brightness-[25%]" src={soundcloudLogo} alt="Soundcloud Logo"/>
            </div>
            <div className="w-32 object">
                <img className="filter invert brightness-[25%]" src={amLogo} alt="Amazon Music Logo"/>
            </div>
        </div>
        <div>
            <p className="text-white">Transfer your music library from any music service to any other you want!</p>
        </div>
        <div>
            <button className="bg-buttonBlue w-64 h-14 text-white rounded-full" onClick={handleStartClick}>Let's Start
            </button>
        </div>
    </div>
}

export default HomePage;