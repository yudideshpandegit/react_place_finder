const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const UserSignUp = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { username, password, email } = req.body;

    console.log(req.body);

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      console.log("existing Uuser");
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (existingUser) {
      
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
  
    let hashedPassword

    try{
      hashedPassword = await bcryptjs.hash(password, 12);
    }catch(err){
      let error = new HttpError('Could not create a new user', 500);
      next(error);  
    }

    console.log(hashedPassword);

    const createdUser = new User({
      userId:"u1",
      username:username,
      email:email,
      password:hashedPassword,
      places: []
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      console.log("not existing Uuser");
      const error = new HttpError(
        err,
        500
      );  
      return next(error);
    }

   let token;

   try{

    token = jwt.sign(
      {userId: createdUser.id, email: createdUser.email},
      'token_create_places',
      { expiresIn: '1h' }
    )

   }catch(err){

     let error = new HttpError("Could not create a token", 500);
     next(error);

    }

    console.log("Was here");

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });

}

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      'Loggin in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {

    console.log("existingUser")
    const error = new HttpError(
      'Invalid credentials, could not log you in existingUser.',
      401
    );

    res.json({
      message: 'Invalid credentials'
    })
    return next(error);
  }

  let isValidPassword = false;

  try{
    isValidPassword = await bcryptjs.compare(password, existingUser.password);
  }catch(err){

    console.log("bcrypt");
    const error = new HttpError(
      'Invalid credentials, could not log you in bcrypt',
      401
    );

    res.json({
      message: 'Invalid credentials'
    })
    return next(error);
  }

  if(!isValidPassword){

    console.log("isValidPassword");

    const error = new HttpError(
      'Invalid credentials, could not log you in isValidPassword',
      401
    );

    res.json({
      message: 'Invalid credentials'
    })
    return next(error);

  }

  let token;

  try{

   token = jwt.sign(
     {userId: existingUser.id, email: existingUser.email},
     'token_create_places',
     { expiresIn: '1h' }
   )

  }catch(err){

    next(error);
    let error = new HttpError("Could not create a token", 500);

   }
 

  res.status(201).json({ userId: existingUser.id, email: existingUser.email, token: token });
};



exports.UserSignUp = UserSignUp;
exports.login = login;