const  { findAllImages } = require('../connection.js')


const express = require('express');

const bodyParser = require("body-parser");

//all the funcs from connection.js to talk to db;
const { GetAllProjects } = require('../connection.js');


const app = express();
// express.use means to use middle ware - express static serves up, __dirname is a global var
// console.log(__dirname, 'THIS IS DIRRR')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../../dist/'));

const port = 3000;
// the server (app.listen takes in a port and a call back);
var server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});


// routing - Route that goes to db and collects all projects; 
app.get('/GetAllProjects', async (req, res) => {

    console.log('getting all projects');
    let result = await findAllImages()


    res.send(result);
})