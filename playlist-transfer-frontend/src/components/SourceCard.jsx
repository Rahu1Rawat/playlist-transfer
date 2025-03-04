function SourceCard({ imgSrc, altText, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-customGrey w-44 h-44 rounded-3xl flex items-center justify-center focus:outline-none hover:opacity-80 active:scale-95"
        >
            <img src={imgSrc} alt={altText} className="object-contain" />
        </button>
    );
}

export default SourceCard;
