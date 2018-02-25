const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const galleryRouter = require('./routes/gallery-router');
const loginRouter = require('./routes/login-router');

// APP.USE BODY-PARSER
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// APP.USE ROUTERS
app.use('/gallery', galleryRouter);
app.use('/login', loginRouter);

// APP.USE EXPRESS.STATIC SERVER/PUBLIC
app.use(express.static('server/public'));

// APP.LISTEN 
app.listen(port, () => {
    console.log('Listening on port', port);    
});