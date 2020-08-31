import React from 'react';

import './PlaceItem.css'
import { Card } from '@material-ui/core';

const PlaceItem = Props => {

    return(
        <Card className = 'place-item'>
            <img src = {Props.imageUrl} className = 'place-item__image'  />

            <div className = "place-item__content">
                <h3>{Props.title}</h3>
                <h4>{Props.address}</h4>
                <p>{Props.description}</p>
            </div>
        </Card>
    );

}

export default PlaceItem;
