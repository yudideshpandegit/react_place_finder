const jwt = require('jsonwebtoken');

module.exports = (req, req, next) => {

    if(req.method == "OPTIONS"){
        next();
    }

    try{

        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'token_create_places');
        req.userData = {userId: decodeToken.userId}
        next();

    }catch(err){
        const error = new HttpError('Authentication failed!', 403);
        return next(error);
    }

};