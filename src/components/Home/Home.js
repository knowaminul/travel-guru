import React, { useState, useEffect } from 'react';
import Place from '../Place/Place';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const Home = () => {
    const classes = useStyles();

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/knowaminul/travel/places/')
            .then(res => res.json())
            .then(data => setPlaces(data))
    }, [])
    return (
        <div className={classes.root}>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {
                        places.map(place => <Grid item xs={12} sm={6} md={4} key={place.name}><Place place={place}></Place></Grid>)
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Home;