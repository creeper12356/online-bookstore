import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../css/SearchBar.css"
import { useState } from "react";
const SearchBar = ({ placeholder, onSearch }) => {
    const [query, setQuery] = useState('');
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearch?.(query);
        }}>
            <Box display="flex" alignItems="center" >
                <TextField
                    className="search-bar-text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        style: {
                            borderRadius: 10
                        }
                    }}
                    variant="outlined"
                    placeholder={placeholder ?? "Search"}
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>

        </form>
    )
};
export default SearchBar;
