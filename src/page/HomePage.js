import {
    Box,
    Drawer,
    IconButton, ImageList, ImageListItem, ImageListItemBar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    Toolbar
} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import BookCard from "../components/BookCard";
import Navigator from "../components/Navigator";

let drawerWidth = 250;
const HomePage = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <Navigator />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Books','Cart','Orders','Profile'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <ImageList
                    cols={4}
                >
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <BookCard
                                img={item.img}
                                title={item.title}
                                alt={item.alt}
                                price={item.price}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Box>

    );
};

//book data
const itemData = [
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },

];
export default HomePage;
