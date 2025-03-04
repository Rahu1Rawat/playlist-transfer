import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SourcesPage from "./pages/SourcesPage.jsx";
import SelectPlaylistsPage from "./pages/SelectPlaylistsPage.jsx";
import MovePlaylistPage from "./pages/MovePlaylistPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/sources" element={<SourcesPage/>}/>
                <Route path="/select-playlists" element={<SelectPlaylistsPage/>}/>
                <Route path="/move-playlists" element={<MovePlaylistPage/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App
