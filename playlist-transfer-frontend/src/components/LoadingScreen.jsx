import LogoBar from "../components/LogoBar.jsx";

function LoadingScreen() {
    return (
        <div className="bg-customBlue text-white min-h-screen">
            <LogoBar />
            <div className="flex flex-col items-center justify-center h-[80vh]">
                <p className="text-2xl mb-4">Loading playlists...</p>
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
        </div>
    );
}

export default LoadingScreen;
