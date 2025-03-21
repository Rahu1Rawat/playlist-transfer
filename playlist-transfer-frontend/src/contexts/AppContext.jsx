import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [selectedPlaylists, setSelectedPlaylists] = useState(new Set());
    const [selectedAlbums, setSelectedAlbums] = useState(new Set());
    const [selectedTracks, setSelectedTracks] = useState(new Set());
    const [selectedArtists, setSelectedArtists] = useState(new Set());

    return (
        <AppContext.Provider
            value={{
                source,
                setSource,
                destination,
                setDestination,
                selectedPlaylists,
                setSelectedPlaylists,
                selectedAlbums,
                setSelectedAlbums,
                selectedTracks,
                setSelectedTracks,
                selectedArtists,
                setSelectedArtists,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);