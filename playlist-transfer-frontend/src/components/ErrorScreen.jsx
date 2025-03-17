import LogoBar from "../components/LogoBar.jsx";

function ErrorScreen({ message }) {
    return (
        <div className="bg-customBlue text-white min-h-screen">
            <LogoBar />
            <div className="flex flex-col items-center justify-center h-[80vh]">
                <p className="text-2xl mb-4">Error loading playlists</p>
                <p className="text-red-400">{message}</p>
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

export default ErrorScreen;
