const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const UserRouter = require('./routers/user-routers');

const PlaceRouter = require('./routers/places-routers');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(cors());

app.use('/api/user', UserRouter);

app.use('/api/place',PlaceRouter);

mongoose
  .connect(
    'mongodb+srv://yudi:mongodb@cluster0.sdz6b.mongodb.net/places?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is started in 4000");  
  });
  })
  .catch(err => {
    console.log(err);
  });
