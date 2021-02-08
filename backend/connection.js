const mongoose = require("mongoose");

var Grid = require("gridfs-stream");

// require dotenv
require("dotenv").config();

//get enviorment passwords
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;

let gfs;

mongoose.set("useUnifiedTopology", true); //-- check docs one syntax(self)

mongoose.connect(
  `mongodb+srv://Eddy:${PASSWORD}@showcase.jaglz.mongodb.net/${DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
); //connect to db

const db = mongoose.connection;

// db.on("error", function () {
//   console.log("connection err");
// });

// make sure the db instance is open before passing into `Grid`
db.once("open", function (err) {
  if (err) {
    console.log(err);
  }

  gfs = Grid(db, mongoose.mongo);
  console.log("DB Connected!");
  // all set!
});

const getCollections = async () => {
  try {
    let collectionPromise = await new Promise((resolve, reject) => {
      db.db.listCollections().toArray(async (err, collections) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        return resolve(collections);
      });
    });

    return collectionPromise;
  } catch (err) {
    console.log(err);
  }
};

const sortThroughCollections = (collections) => {
  let newCollection = collections.filter((collection) => {
    let files = "files";
    let collectionName = collection.name.slice(-5);

    if (collectionName === files) {
      return collection;
    }
  });

  return newCollection;
};

const findAllImages = async () => {
  //returns documents from db

  try {
    let getCollectionsFunc = await getCollections();

    let collections = getCollectionsFunc;

    let sortedCollections = await sortThroughCollections(collections);

    // console.log(sortedCollections);
    return sortedCollections;
  } catch (err) {
    console.log(err);
  }
};

const GetDocumentsFromCollection = async (collection) => {
  let collectionName = collection.name;

  let Get_Collection = await new Promise((resolve, reject) => {
    db.db.collection(collectionName, async (err, collection) => {
      if (err) {
        return reject(err);
      }

      return resolve(collection);
    });
  });

  let Get_Documents = await new Promise((resolve, reject) => {
    Get_Collection.find({}).toArray((err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });

  let New_Collection_With_Documents = JSON.parse(JSON.stringify(collection));

  New_Collection_With_Documents["new_documents"] = Get_Documents;

  return New_Collection_With_Documents;
};

module.exports.GetDocumentsFromCollection = GetDocumentsFromCollection;
module.exports.findAllImages = findAllImages;
