import { ButtonBase, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    image: {
        width: 270,
        height: 188,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        width: 270,
        height: 188,
        borderRadius: '10px',
    },
}));

const HotelDetails = (props) => {
    const classes = useStyles();
    const { title, image, rooms, facilities, other, rating, reviewer, price, total } = props.hotel;

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                <span style={{ fontSize: '18px', fontWeight: '500' }}>{title}</span>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {rooms}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {facilities}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {other}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Typography variant="body2">
                                        <img style={{ width: '16px', height: '16px', marginBottom: '5px' }} src="https://i.ibb.co/wK5n8rH/star-1.png" alt="" /> <span style={{ fontSize: '14px', fontWeight: '500' }}>{rating}({reviewer})</span>
                                </Typography>
                                    <Typography variant="body2">
                                        <span style={{ fontSize: '18px', fontWeight: '500' }}>${price}</span>/night
                                </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ${total} total
                                </Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </div>
    );
};

export default HotelDetails;