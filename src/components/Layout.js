import Navigator from "./Navigator";
import {Box, Toolbar} from "@mui/material";
import {useNavigate} from "react-router";
import {getMe} from "../service/user";
import {useEffect} from "react";

export function BasicLayout ({children}){
    return (
        <>
            <Navigator />
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                {children}
            </Box>
        </>
    );
};

export function PrivateLayout ({children}){
    const navigate = useNavigate();
    const checkLogin = async () => {
        let result = await getMe();
        if(!result) {
            navigate('/login');
        }
    };

    useEffect(() => {
        checkLogin();
    });
    return (
        <>
            <Navigator />
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                {children}
            </Box>
        </>
    );
}
