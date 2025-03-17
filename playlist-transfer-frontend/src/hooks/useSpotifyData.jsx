import { useState, useEffect } from "react";

function useSpotifyData(endpoint) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/spotify/${endpoint}`, { credentials: "include" })
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
                return response.json();
            })
            .then((json) => {
                console.log(`${endpoint} API Response:`, json);
                setData(json);
            })
            .catch((err) => setError(err.message));
    }, [endpoint]);

    return { data, error };
}

export default useSpotifyData;
