import Navigator from "./Navigator";
import {Box, Toolbar} from "@mui/material";
import {useNavigate} from "react-router";
import {getMe} from "../service/user";
import {useEffect} from "react";

export function BasicLayout ({children}){
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Navigator />
            <Box component="main" sx={{flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column'}}>
                <Toolbar/>
                {children}
            </Box>
        </div>
    );
};

export function PrivateLayout ({children}){
    const navigate = useNavigate();
    const checkLogin = async () => {
        try {
            await getMe();
        } catch(e) {
            navigate('/login');
        }
    };
    useEffect(() => {
        checkLogin();
    });
    return <BasicLayout children={children} />;
}
