const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const galleryRouter = require('./routes/gallery-router');

// APP.USE BODY-PARSER
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// APP.USE GALLERYROUTER
app.use('/gallery', galleryRouter);

// APP.USE EXPRESS.STATIC SERVER/PUBLIC
app.use(express.static('server/public'));

// APP.LISTEN 
app.listen(port, () => {
    console.log('Listening on port', port);    
}); // END 