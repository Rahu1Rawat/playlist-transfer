import {Avatar, Checkbox} from "@mui/material";

function SpotifyPlaylistCard({id, name, trackCount, imageUrl, isSelected, onToggle}) {
    return <div className="flex justify-between p-3 w-full items-center">
        <div className="flex gap-3 items-center">
            <div>
                <Checkbox
                    sx={{p: 0, color: "white"}}
                    checked={isSelected}
                    onChange={onToggle}
                />
            </div>
            <div>
                <Avatar variant="square" src={imageUrl}/>
            </div>
            <div>
                <div>
                    <p className="font-semibold text-xl">{name}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold">{trackCount}</p>
                </div>
            </div>
        </div>
        <div>
            I
        </div>
    </div>
}

export default SpotifyPlaylistCard;