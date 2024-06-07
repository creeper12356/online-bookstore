import Navigator from "./Navigator";
import { Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router";
import { getMe } from "../service/user";
import { useEffect, useState } from "react";

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
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const checkLogin = async () => {
        getMe().then(user => {
            setUser(user);
        })
        .catch(e => {
            navigate('/login');
        });
    };
    useEffect(() => {
        checkLogin();
    }, []);
    return (<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navigator userAvatar={user.avatar}/>
        <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            {children}
        </Box>
    </div>);
}
