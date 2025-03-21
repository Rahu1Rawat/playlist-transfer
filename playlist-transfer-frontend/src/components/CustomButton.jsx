import {useNavigate} from 'react-router-dom';

const CustomButton = ({text}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/select-destination")
    };

    return (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-10">
            <button
                onClick={handleClick}
                className="bg-buttonBlue hover:bg-green-600 text-white font-bold py-3 px-6 shadow-lg w-96 rounded-full text-xl"
            >
                {text}
            </button>
        </div>
    );
};

export default CustomButton;
