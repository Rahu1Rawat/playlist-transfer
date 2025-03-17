import { useNavigate } from 'react-router-dom';

const CustomButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // yet to decide
    };

    return (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-10">
            <button
                onClick={handleClick}
                className="bg-buttonBlue hover:bg-green-600 text-white font-bold py-3 px-6 shadow-lg w-96 rounded-full text-xl"
            >
                Choose Destination
            </button>
        </div>
    );
};

export default CustomButton;
