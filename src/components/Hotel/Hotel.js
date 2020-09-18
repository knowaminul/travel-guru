import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import HotelDetails from '../HotelDetails/HotelDetails';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        margin: '20px',
    },
    map: {
        padding: theme.spacing(2),
        borderRadius: '10px',
    },
}));

const Hotel = () => {
    const classes = useStyles();
    const [hotels, setHotels] = useState([]);

    let { name } = useParams();

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/knowaminul/travel/hotels?name=${name}`)
            .then(res => res.json())
            .then(data => setHotels(data))
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid container xs={12} sm={6}>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">
                                <span style={{ marginLeft: '20px' }}>252 stays Sept 18-21 3 guests</span>
                            </Typography>
                            <Typography variant="body">
                                <span style={{ fontFamily: 'Montserrat', fontSize: '24px', fontWeight: '700', marginLeft: '20px' }}>Stay in {name}</span>
                            </Typography>
                        </Grid>
                        {
                            hotels.map(hotel => <HotelDetails key={hotel.name} hotel={hotel}></HotelDetails>)
                        }
                    </Grid>
                    <Grid container xs={12} sm={6} justify="center" className={classes.map}>
                            <iframe
                                className="app__iframe"
                                frameBorder="0"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA3y4Yk4vH4EoWhgyLe8OefPeT1EGVSHxE&q=${name}`}
                                allowFullScreen
                            ></iframe>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Hotel;