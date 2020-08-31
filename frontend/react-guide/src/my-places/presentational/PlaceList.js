import React from 'react';

import './PlaceList.css';
import PlaceItem from './PlaceItem';

const PlaceList = Props => {

    return(
        <div className = 'place-list'>
            {
                Props.item.map((element) => {
                  
                    return(
                    <PlaceItem 
                    title = {element.title}
                    description = {element.description}
                    imageUrl = {element.imageUrl}
                    address = {element.address}
                    creator = {element.creator}
                />    
                    )
                })
            }
        </div>
    );

}

export default PlaceList;