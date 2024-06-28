import {AppBar, Avatar, Box, IconButton, Link, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import {useContext} from "react";
import {NavigatorIndexContext} from "../lib/Context";

const Navigator = ({userAvatar, avatarLink, isAdmin=false}) => {
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
                    <Tab label="订单" href="/order"/>
                    {isAdmin && <Tab label="排行" href="/admin/rank"/>}
                    {isAdmin && <Tab label="书籍管理" href="/admin/books"/>}
                    {isAdmin && <Tab label="订单管理" href="/admin/orders"/>}
                    {isAdmin && <Tab label="用户管理" href="/admin/users"/>}
                </Tabs>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {<IconButton href={avatarLink}>
                        <Avatar src={userAvatar} />
                    </IconButton>}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Navigator;
