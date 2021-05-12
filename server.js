// server js creates app and sets up routing services. 
const express = require('express');

const port = 8000;

const gitsource = "https://github.com/timschott/dd-db/blob/main/corpus/txts(cleaned)/";

// create new express app and save it as "app"
const app = express()

// db conf
const DB_PORT = process.env.PORT || 8080

// connect to database
const MongoClient = require('mongodb').MongoClient

var db

// creds -  grab from enviroment var file.
require('dotenv').config({

    path: '.env'
})
var url = process.env.MONGO_URI

// connect to database.
MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {

    if (err) return console.log(err)
    db = client.db('dddb') // the database to this, try
    app.listen(DB_PORT, () => {
        console.log(`Server running at: http://localhost:${DB_PORT}/`);
    })
})

// debug
app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get('/api/words', (req, res) => {

  // query parameters
  var params = req.query;

  // overall query
  var conditions = {};

  // containers for clauses
  var and_clauses = [];
  var or_clauses = [];
  
  // &book=[] (multi-val)
  if (params.book) {   
    if (typeof(params.book) == "object") {
      for (var i = 0; i < params.book.length; i++) {
        or_clauses.push({'Book': params.book[i]})
      }
    } else if (typeof(params.book) == "string") {
      and_clauses.push({'Book': params.book})
    }
  }

  // &dialogue=T/F
  if (params.dialogue) {
    if (params.dialogue == "T") {
      and_clauses.push({'Dialogue': '1'})
    } else if (params.dialogue == "F") {
      and_clauses.push({'Dialogue': '0'})
    }
  }

  // debug for query
  console.log("full query: " + JSON.stringify(conditions));

  db.collection("texts", function(err, texts) {

    // query using conditions
    texts.find( conditions, function( err, cursor) {

      cursor.sort({"_id":1}).limit(100).toArray(function(err, itemArr) {

        console.log("# ITEMS " + itemArr.length);

          // package these up into one json
          var words = [];
          var ref_lines = [];
          var books = [];
          var mongo_ids = [];

          for(var i=0; i<itemArr.length; i++) {
            words.push(itemArr[i].Content);
            books.push(itemArr[i].Book);
            mongo_ids.push(itemArr[i]._id);
            var fakeId = itemArr[i].FakeID.split("_")
            ref_lines.push(gitsource + fakeId[0] + ".txt#" + fakeId[1]);
          }

          res.json(words);
        })
      })
  })
})
