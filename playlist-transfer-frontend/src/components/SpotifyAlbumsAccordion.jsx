import {Accordion, AccordionSummary, AccordionDetails, Avatar, Checkbox, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SpotifyAlbumCard from "./SpotifyAlbumCard";
import AlbumCover from "../assets/images/Album-Cover.png";

const SpotifyAlbumsAccordion = ({albums, selectedAlbums, setSelectedAlbums}) => {
    const handleParentCheckboxChange = () => {
        if (selectedAlbums.size === albums.length) {
            setSelectedAlbums(new Set());
        } else {
            setSelectedAlbums(new Set(albums.map(album => album.album.id)));
        }
    };

    const handleChildCheckboxChange = (albumId) => {
        setSelectedAlbums((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(albumId)) {
                newSelected.delete(albumId);
            } else {
                newSelected.add(albumId);
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
                        checked={selectedAlbums.size > 0}
                        indeterminate={
                            selectedAlbums.size > 0 &&
                            selectedAlbums.size < albums.length
                        }
                        onChange={handleParentCheckboxChange}
                    />
                    <Avatar
                        variant="square"
                        src={AlbumCover}
                        sx={{width: 55, height: 55}}
                    />
                    <div className="flex flex-col">
                        <Typography sx={{color: "white", fontWeight: "bold"}}>
                            Favorite Albums
                        </Typography>
                        <Typography sx={{color: "#b0b3c3", fontSize: "0.875rem"}}>
                            {selectedAlbums.size}/{albums.length} selected
                        </Typography>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails>
                <div className="flex flex-col gap-2 text-white">
                    {albums.length > 0 ? (
                        albums.map((album) => (
                            <SpotifyAlbumCard
                                key={album.album.id}
                                name={album.album.name}
                                albumId={album.album.id}
                                totalAlbums={albums.length}
                                imageUrl={
                                    album.album.images.length > 0
                                        ? album.album.images[0].url
                                        : ""
                                }
                                artist={album.album.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                                isChecked={selectedAlbums.has(album.album.id)}
                                onCheckboxChange={handleChildCheckboxChange}
                            />
                        ))
                    ) : (
                        <div className="p-4 text-center">No albums found</div>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default SpotifyAlbumsAccordion;
