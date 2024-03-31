import {AppBar,  Box, IconButton, Link, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useContext} from "react";
import {NavigatorIndexContext} from "../lib/Context";

const Navigator = () => {
    const navigatorIndex = useContext(NavigatorIndexContext);
    return (
        <AppBar
            position="fixed"
            sx={{backgroundColor: 'white'}}
        >
            <Toolbar>
                <Box>
                    <Link href="/" underline="none">
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{
                                color: 'steelblue',
                                paddingRight: 10,
                            }}
                        >
                            Book Store
                        </Typography>
                    </Link>

                </Box>
                <Tabs value={navigatorIndex}>
                    <Tab label="首页" href="/"/>
                    <Tab label="购物车" href="/cart" />
                    <Tab label="订单" />
                    <Tab label="排行" />
                </Tabs>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                        size="large"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Navigator;
