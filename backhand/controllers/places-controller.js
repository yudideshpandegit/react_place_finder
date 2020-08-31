const Place = require('../models/places');

const HttpError = require('../models/http-error');

const {validationResult} = require('express-validator');

const User = require('../models/user');

const getPlacesByUserId = async (req, res, next) => {

    const placeId = req.params.pid;

    let places;

    try{
        places = await Place.find({id:placeId})
    }catch(error){

        error = new HttpError(
            'Could not connect with places collections', 422    
        );
        
        next(error);
    }

    if(!places){
        res.json({message:"Could not find the places"});

        error = new HttpError(
            'Could not find the places', 422    
        );
        
        next(error);
    }

    res.json({places});

}


const createPlace = (req, res, next) => {

    const errorValidation = validationResult(req);

    if(!errorValidation.isEmpty()){
        let error = new HttpError('Invalid Credentials', 422);
        next(error);
    }

    let {title, address, description, creator} = req.body;

    console.log(title);

    res.status(200).json({
        message: "Success!"
    })

}

exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;