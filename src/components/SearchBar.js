import {Box, IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../css/SearchBar.css"
const SearchBar = () => {
    return (
        <form>
            <Box className="search-bar-container">
                <TextField
                    id="search-bar"
                    className="search-bar-text"
                    InputProps={{
                        style:{borderRadius: 10}
                }}
                    variant="outlined"
                    placeholder="Search books..."
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </form>
    )
};
export default SearchBar;
