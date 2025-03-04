import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
    return <div>
        <TextField placeholder="Search"
                   sx={{
                       width: "400px",
                       "& .MuiOutlinedInput-root": {
                           borderRadius: "50px",
                           height: "38px",
                           "& fieldset": {
                               borderColor: "white"
                           }
                       },
                       input: {
                           color: "white" // text color inside
                       }
                   }}
                   slotProps={{
                       input: {
                           startAdornment: (
                               <InputAdornment position="start">
                                   <SearchIcon style={{color: "white"}}/>
                               </InputAdornment>
                           ),
                       },
                   }}
        />
    </div>
}

export default SearchBar;