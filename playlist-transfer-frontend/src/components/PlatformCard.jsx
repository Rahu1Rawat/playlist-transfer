function PlatformCard({ platformId, source, imgSrc, altText, onClick }) {
    const isSelected = platformId === source;

    if (isSelected) {
        return (
            <div className="relative w-48 h-48 rounded-[20px] border-[3px] border-purple-500 bg-customGrey flex flex-col items-center justify-start">
                <div className="absolute -top-3 px-3 py-1 bg-gradient-to-r from-purple-400 to-blue-500 text-white text-sm font-semibold rounded-md">
                    Source
                </div>
                <div className="flex-grow flex items-center justify-center w-full">
                    <img src={imgSrc} alt={altText} className="object-contain h-16" />
                </div>
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-customGrey w-48 h-48 rounded-3xl flex items-center justify-center focus:outline-none hover:opacity-80 active:scale-95"
        >
            <img src={imgSrc} alt={altText} className="object-contain h-16" />
        </button>
    );
}

export default PlatformCard;
