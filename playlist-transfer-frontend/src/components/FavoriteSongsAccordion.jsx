import {Accordion, AccordionDetails, AccordionSummary, Avatar, Checkbox, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LikedSongsCover from "../assets/images/liked-songs-cover.jpg";

const FavoriteSongsAccordion = ({tracks, selectedTracks, setSelectedTracks}) => {
    const handleParentCheckboxChange = () => {
        if (selectedTracks.size === tracks.length) {
            setSelectedTracks(new Set()); // Unselect all
        } else {
            setSelectedTracks(new Set(tracks.map(track => track.id))); // Select all
        }
    };

    const handleChildCheckboxChange = (trackId) => {
        setSelectedTracks((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(trackId)) {
                newSelected.delete(trackId);
            } else {
                newSelected.add(trackId);
            }
            return newSelected;
        });
    };

    return (
        <Accordion sx={{backgroundColor: "#181e38", color: "white"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}>
                <div className="flex items-center gap-3 w-full">
                    <Checkbox
                        sx={{color: "white"}}
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        checked={selectedTracks.size > 0}
                        indeterminate={selectedTracks.size > 0 && selectedTracks.size < tracks.length}
                        onChange={handleParentCheckboxChange}
                    />

                    <Avatar
                        variant="square"
                        src={LikedSongsCover}
                        sx={{width: 55, height: 55}}
                    />

                    <div className="flex flex-col">
                        <Typography sx={{color: "white", fontWeight: "bold"}}>
                            Favorite Songs
                        </Typography>
                        <Typography sx={{color: "#b0b3c3", fontSize: "0.875rem"}}>
                            {selectedTracks.size}/{tracks.length} selected
                        </Typography>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails>
                <div className="flex flex-col gap-2">
                    {tracks && tracks.length > 0 ? (
                        tracks.map((track) => (
                            <div key={track.id} className="flex items-center gap-3 p-2 bg-[#1c2541] rounded-md">
                                <Checkbox
                                    sx={{color: "white"}}
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    checked={selectedTracks.has(track.id)}
                                    onChange={() => handleChildCheckboxChange(track.id)}
                                />

                                <Avatar
                                    variant="square"
                                    src={track.albumImageUrl}
                                    sx={{width: 40, height: 40}}
                                />
                                <div>
                                    <Typography sx={{color: "white", fontWeight: "bold"}}>
                                        {track.trackName}
                                    </Typography>
                                    <Typography sx={{color: "#b0b3c3", fontSize: "0.875rem"}}>
                                        {track.artistNames.join(", ")}
                                    </Typography>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography>No favorite songs found</Typography>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default FavoriteSongsAccordion;