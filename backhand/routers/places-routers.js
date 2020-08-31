const express = require('express');

const {check} = require('express-validator');

const PlaceController = require('../controllers/places-controller');

const router = express.Router();

router.post(
    '/',
    [
      check('title')
        .not()
        .isEmpty(),
      check('description').isLength({ min: 5 }),
      check('address')
        .not()
        .isEmpty()
    ],
    PlaceController.createPlace
  );

router.get('/:pid', PlaceController.getPlacesByUserId);



module.exports = router;