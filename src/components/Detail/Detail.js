import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '100px',
    },
    placeName: {
        fontFamily: 'Bebus Neue',
        fontWeight: 500,
        fontSize: '65px',
        color: '#FFF',
    },
    placeDescription: {
        fontFamily: 'Montserrat',
        fontWeight: 400,
        fontSize: '14px',
        color: '#FFF',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paper: {
        padding: '10px',
    },
    buttonBG: {
        background: '#F9A51A',
        marginTop: '15px',
        minWidth: '100%',
    },
    input: {
        marginBottom: '10px',
        marginTop: '10px',
        width: '100%'
    }
}));

const Detail = (props) => {
    const classes = useStyles();
    const { name, description } = props.detail;

    const history = useHistory();
    const handleBooking = (name) => {
        history.push(`/hotel/${name}`);
    }
    return (
        <div className={classes.root}>
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography className={classes.placeName} component="h1">{name}</Typography>
                        <Typography className={classes.placeDescription} component="p">{description}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} className={classes.paper}>

                            <form className={classes.container} noValidate>
                                <TextField
                                    id="standard-read-only-input"
                                    label="Origin"
                                    defaultValue="Dhaka"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    className={classes.input}
                                />
                                <TextField
                                    id="standard-read-only-input"
                                    label="Destination"
                                    defaultValue={name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    className={classes.input}
                                />
                                <div style={{ display: 'flex' }}>
                                    <TextField
                                        id="date"
                                        label="From"
                                        type="date"
                                        defaultValue="2020-09-18"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="date"
                                        label="To"
                                        type="date"
                                        defaultValue="2020-09-21"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </form>
                            <Button size="medium" className={classes.buttonBG} onClick={() => handleBooking(name)}>Start Booking</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Detail;