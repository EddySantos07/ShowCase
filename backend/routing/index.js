const express = require("express");

const bodyParser = require("body-parser");

//all the funcs from connection.js to talk to db;
const { findAllImages } = require("../connection.js");
const { GetDocumentsFromCollection } = require("../connection.js");
const { Collection } = require("mongoose");

const app = express();
// express.use means to use middle ware - express static serves up, __dirname is a global var
// console.log(__dirname, 'THIS IS DIRRR')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../../dist/"));

const port = 3000;
// the server (app.listen takes in a port and a call back);
var server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

/* routing - Route that goes to db and collects all projects; */
app.get("/GetAllProjects", async (req, res) => {
  let result = await findAllImages();

  res.send(result);
});

/* accepting collections and finding/returning documents */
app.put("/GetDocumentsFromCollection", async (req, res) => {
  let collections = req.body.collections;

  //  console.log(collections, "request");

  let Documents_And_Collections = await Promise.all(
    collections.map(async (collection) => {
      /* this func call with map gets documents for each collection and returns an obj */

      let Updated_Collection_With_Documents = await GetDocumentsFromCollection(
        collection
      );

      return Updated_Collection_With_Documents;
    })
  );

  res.send(Documents_And_Collections);
});
