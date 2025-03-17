import {Accordion, AccordionDetails, AccordionSummary, Avatar, Checkbox, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavArtist from "../assets/images/FavArtistCover.png"

const FavoriteArtistsAccordion = ({artists, selectedArtists, setSelectedArtists}) => {
    const handleParentCheckboxChange = () => {
        if (selectedArtists.size === artists.length) {
            setSelectedArtists(new Set()); // Unselect all
        } else {
            setSelectedArtists(new Set(artists.map(artist => artist.name))); // Select all by name
        }
    };

    const handleArtistCheckboxChange = (artistName) => {
        setSelectedArtists((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(artistName)) {
                newSelected.delete(artistName);
            } else {
                newSelected.add(artistName);
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
                        checked={selectedArtists.size > 0}
                        indeterminate={selectedArtists.size > 0 && selectedArtists.size < artists.length}
                        onChange={handleParentCheckboxChange}
                    />

                    <Avatar
                        variant="square"
                        src={FavArtist}
                        sx={{width: 55, height: 55}}
                    />

                    <div className="flex flex-col">
                        <Typography sx={{color: "white", fontWeight: "bold"}}>
                            Favorite Artists
                        </Typography>
                        <Typography sx={{color: "#b0b3c3", fontSize: "0.875rem"}}>
                            {selectedArtists.size}/{artists.length} selected
                        </Typography>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails>
                <div className="flex flex-col gap-2">
                    {artists && artists.length > 0 ? (
                        artists.map((artist, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-[#1c2541] rounded-md">
                                <Checkbox
                                    sx={{color: "white"}}
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    checked={selectedArtists.has(artist.name)}
                                    onChange={() => handleArtistCheckboxChange(artist.name)}
                                />

                                <Avatar
                                    variant="square"
                                    src={artist.imageUrl || FavArtist}
                                    sx={{width: 40, height: 40}}
                                />
                                <div>
                                    <Typography sx={{color: "white", fontWeight: "bold"}}>
                                        {artist.name}
                                    </Typography>
                                    <Typography sx={{color: "#b0b3c3", fontSize: "0.875rem"}}>
                                        {artist.genres && artist.genres.length > 0 ? artist.genres.join(", ") : "No genres"}
                                    </Typography>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography>No favorite artists found</Typography>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default FavoriteArtistsAccordion;