import {Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const SideBar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 250,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <BookIcon />
                            <ListItemText primary="Books" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ShoppingCartIcon />
                            <ListItemText primary="Cart" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ArticleIcon />
                            <ListItemText primary="Orders" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <AccountBoxIcon />
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};
export default SideBar;
