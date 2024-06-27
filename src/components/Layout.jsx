import Navigator from "./Navigator";
import { Box, Toolbar } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../lib/Context";

export function BasicLayout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navigator />
            <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Toolbar />
                {children}
            </Box>
        </div>
    );
};

export function PrivateLayout({ children }) {
    const user = useContext(UserContext);

    return (<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navigator userAvatar={user.avatar} avatarLink={`/profile/${user.id}`} isAdmin={user.isAdmin} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            {children}
        </Box>
    </div>);
}
