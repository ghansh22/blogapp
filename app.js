/* ==================================================
Import Node modules
===================================================*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config/database');
const authentication = require('./routes/authentication')(router);


// vars
const app = express();
const port = 8080;

mongoose.connect(config.uri, (error) => {
    if(error){
        console.log(error);
    }else{
        console.log('connected to database: '+config.db);
    }
}); 


/* ==================================================
Middlewares
===================================================*/
// bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// static folder
app.use(express.static(__dirname+'/public/dist'));
// authentication route
app.use('/authentication',authentication);

// connect to index html in angular 2
app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname+'/public/dist/index.html'));
});

/* ==================================================
server
===================================================*/
app.listen(port, ()=>{
    console.log('listening on port: '+port);
});