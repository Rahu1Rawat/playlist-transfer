function SourceCard({onClick, imgSrc, altText}) {
    // Regular source card
    return (
        <button
            onClick={onClick}
            className="bg-customGrey w-48 h-48 rounded-3xl flex items-center justify-center focus:outline-none hover:opacity-80 active:scale-95"
        >
            <img src={imgSrc} alt={altText} className="object-contain"/>
        </button>
    );
}

export default SourceCard