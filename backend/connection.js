const mongoose = require('mongoose');

// require dotenv
require('dotenv').config();

//get enviorment passwords
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;

mongoose.connect(`mongodb+srv://Eddy:${PASSWORD}@showcase.jaglz.mongodb.net/${DB}?retryWrites=true&w=majority`, { useNewUrlParser: true } );

const db = mongoose.connection;

// checking for errs
db.on('error', function () {
    console.log('connection err');
});

db.once('open', function () {
    console.log('DB Connected!');
});

const projectSchema = new mongoose.Schema({
    name: String,
    difficulty: Number,
});

