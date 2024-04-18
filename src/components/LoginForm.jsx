import {Avatar, Button, Checkbox, Container, FormControlLabel, Link, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router";
import {login} from "../service/login";

const LoginForm = ({title, userLabel, passwordLabel, loginButtonText}) => {
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
        <Container className="login-page-container">
            <Paper className="login-page-paper">
                <div className="login-page-div">
                    <Avatar />
                    <Typography component="h1" variant="h5">
                        { title ?? 'Login in' }
                    </Typography>
                    <form onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label={userLabel ?? 'username'}
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
                            label={passwordLabel ?? 'password'}
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
                                    checked={isRememberMe}
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
                            style={{marginBottom: '10px'}}
                        >
                            {loginButtonText ?? 'Login'}
                        </Button>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </form>
                </div>
            </Paper>
        </Container> );
}
export default LoginForm;
