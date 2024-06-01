import {Avatar, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import '../css/RegisterPage.css';
import { register } from '../service/auth';
const RegisterForm = (
    {
        title, 
        userLabel, 
        passwordLabel, 
        repeatPasswordLabel,
        emailLabel,
        registerButtonText,
        onRegisterOk,
        onRegisterError
    } ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== repeatPassword) {
            onRegisterError?.('两次输入的密码不一致');
            return ;
        }
        
        register(username, password, email)
            .then(result => {
                onRegisterOk?.(result.message);
            })
            .catch(result => {
                onRegisterError?.(result.message);
            });
    };
    return (
        <Container className="register-page-container">
            <Paper className="register-page-paper">
                <div className="register-page-div">
                    <Avatar />
                    <Typography component="h1" variant="h5">
                        { title ?? 'Sign up' }
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repeat-password"
                            label={repeatPasswordLabel ?? 'repeat password'}
                            type="password"
                            id="repeat-password"
                            onChange={(e) => {
                                setRepeatPassword(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label={emailLabel ?? 'email'}
                            type="email"
                            id="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{marginBottom: '10px'}}
                        >
                            {registerButtonText ?? 'Register'}
                        </Button>
                    </form>
                </div>
            </Paper>
        </Container> );
}
export default RegisterForm;
