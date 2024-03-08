import {
    Avatar,
    Button,
    Container,
    FormControlLabel,
    Link,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {CheckBox} from "@mui/icons-material";
import Navigator from "../components/Navigator";

import '../css/LoginPage.css'
const LoginPage = () => {
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
                        <form>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                type="text"
                                id="username"
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
                            />
                            <FormControlLabel
                                control={<CheckBox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                href="/"
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
