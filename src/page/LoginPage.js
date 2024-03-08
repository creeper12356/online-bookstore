import {Avatar, Button, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import {CheckBox} from "@mui/icons-material";
import Navigator from "../components/Navigator";
const LoginPage = () => {
    return (
        <>
            <Navigator />
            <Container
                style={{
                    display:"flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}
            >
                <Paper
                    style={{
                        width: 550,
                        height: 600,
                        borderRadius: 15,
                        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 80,
                            gap: 20,
                        }}
                    >
                        <Avatar></Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form                        >
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
                                color="primary"
                                href="/"
                            >
                                Sign In
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
