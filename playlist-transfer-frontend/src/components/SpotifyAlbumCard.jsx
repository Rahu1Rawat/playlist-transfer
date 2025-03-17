import { Avatar, Checkbox } from "@mui/material";

function SpotifyAlbumCard({ name, albumId, imageUrl, artist, isChecked, onCheckboxChange }) {
    return (
        <div className="flex justify-between p-3 w-full items-center bg-[#1c2541] rounded-md">
            <div className="flex gap-3 items-center">
                <div>
                    {/* Child Checkbox */}
                    <Checkbox
                        sx={{ p: 0, color: 'white' }}
                        checked={isChecked}
                        onChange={() => onCheckboxChange(albumId)}
                    />
                </div>
                <div>
                    <Avatar variant="square" src={imageUrl} />
                </div>
                <div>
                    <div>
                        <p className="font-semibold text-xl">{name}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold">{artist}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpotifyAlbumCard;
