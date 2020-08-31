import React from 'react';

import './Card.css';



const Card = Props => {

    return(
        <div className = 'card'>
            {Props.children}
        </div>  
    )
}

export default Card;