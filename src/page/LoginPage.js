import {
    Avatar,
    Button, Checkbox,
    Container,
    FormControlLabel,
    Link,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import Navigator from "../components/Navigator";

import '../css/LoginPage.css'
import {login} from "../service/login";
import {useState} from "react";
import {useNavigate} from "react-router";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        let result = await login(username, password);
        if(result.ok) {
            navigate('/');
        }
    };


    return (
        <>
            <Navigator />
            <Container className="login-page-container">
                <Paper className="login-page-paper">
                    <div className="login-page-div">
                        <Avatar></Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form onSubmit={onSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                type="text"
                                id="username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    onChange={(e)=> {
                                        setRememberMe(e.target.checked);
                                    }}
                                />}
                                label="Remember me"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Log in
                            </Button>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </form>
                    </div>
                </Paper>
            </Container>
        </>


    );
};
export default LoginPage;
