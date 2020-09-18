import React, { useState } from 'react';
import './Login.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFBSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from './loginManager';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: '10px',
        borderRadius: '10px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    login: {
        marginTop: '10px',
    },
    margin: {
        borderRadius: '10px',
        minWidth: '100%',
        marginTop: '10px',
    },
    button: {
        width: '30px',
        height: '30px',
        marginRight: '10px',

    }

}));

initializeLoginFramework();

function Login() {
    const classes = useStyles();
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(response => {
                handleResponse(response, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(response => {
                handleResponse(response, false);
            })
    }

    const FBSignIn = () => {
        handleFBSignIn()
            .then(response => {
                handleResponse(response, true);
            })
    }

    const handleResponse = (response, redirect) => {
        setUser(response);
        setLoggedInUser(response);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (event) => {
        let isFieldValid;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isFieldValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(event.target.value);
        }
        if (isFieldValid) {
            const newUser = { ...user };
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(response => {
                    handleResponse(response, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(response => {
                    handleResponse(response, true);
                })
        }

        event.preventDefault();
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn && <div>
                    <p>Welcome {user.name}</p>
                    <p>{user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {newUser ? 'Sign up' : 'Sign in'}
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                newUser &&
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onBlur={handleBlur}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Link onClick={() => resetPassword(user.email)} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={() => setNewUser(!newUser)}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label={newUser ? 'Already have an account? Sign in' : 'Do not have an account? Sign up'}
                                />
                            </Grid>
                        </Grid>
                        <Divider variant="inset" style={{ width: '100%' }} />
                        <Grid item xs className={classes.login}>
                            <Grid item>
                                {
                                    user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
                                        <Button variant="outlined" size="medium" color="primary" className={classes.margin} style={{ cursor: 'pointer' }} onClick={googleSignIn}>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item><img className={classes.button} src={'https://i.ibb.co/SwHCWqq/google.png'} alt="" /></Grid>
                                                <Grid item>Continue with Google</Grid>
                                            </Grid>
                                        </Button>
                                }
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" size="medium" color="primary" className={classes.margin} style={{ cursor: 'pointer' }} onClick={FBSignIn}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item><img className={classes.button} src={'https://i.ibb.co/5LNWktZ/fb.png'} alt="" /></Grid>
                                        <Grid item>Continue with Facebok</Grid>
                                    </Grid>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <br />
                <Typography component="p" variant="p" style={{ color: "red" }}>
                    {user.error}
                </Typography>
                {user.success &&
                    <Typography component="p" variant="p" style={{ color: "green" }}>
                        User {newUser ? 'Created' : 'Login'} Successfully!
                </Typography>
                }
            </Container>
        </div>
    );
}

export default Login;