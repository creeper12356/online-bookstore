import Navigator from "./Navigator";
import { Box, Toolbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
    console.log("user = ", user);

    return (<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navigator userAvatar={user.avatar} isAdmin={user.isAdmin} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            {children}
        </Box>
    </div>);
}
