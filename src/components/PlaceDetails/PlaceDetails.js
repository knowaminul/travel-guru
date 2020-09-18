import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlaceDetails.css';
import Detail from '../Detail/Detail';

const PlaceDetails = () => {


    let { name } = useParams();

    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/knowaminul/travel/places?name=${name}`)
            .then(res => res.json())
            .then(data => setDetails(data))
    }, [])  

    return (
        <div>
            {
                details.map(detail => <Detail key={detail.name} detail={detail}></Detail>)
            }
        </div>
    );
};

export default PlaceDetails; 