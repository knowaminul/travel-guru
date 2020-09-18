import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Place.css';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: '10px',
        borderRadius: '10px',
    },
    media: {
        height: 250,
    },
    buttonBG: {
        background: '#E0A800',
        color: '#000',
        borderRadius: '5px',
    },
});

const Place = (props) => {
    
    const classes = useStyles();

    const { name, description, image } = props.place;

    const history = useHistory();

    const handleBook = (name) => {
        history.push(`/place/${name}`);
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Place Name"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description.slice(0, 100)}..
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" className={classes.buttonBG} onClick={() => handleBook(name)}>
                    Booking
                </Button>
            </CardActions>
        </Card>
    );
};

export default Place;