import logo from '../assets/images/Playlist-Transfer-Blue-Logo.png';

function LogoBar() {
    return (
        <div className="bg-logoBarBlue w-full h-24 flex items-center">
            <img className="w-48 m-0" src={logo} alt="Logo" />
        </div>
    );
}

export default LogoBar;
