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
          var words_data = [];
          var words = [];
          var ref_lines_data = [];
          var books_data = [];
          var mongo_ids_data = [];

          var res_data = {};

          var container = {};

          for(var i=0; i<itemArr.length; i++) {
            words_data.push(itemArr[i].Content);
            words.push(itemArr[i].Content);
            books_data.push(itemArr[i].Book);
            mongo_ids_data.push(itemArr[i]._id);
            var fakeId = itemArr[i].FakeID.split("_")
            ref_lines_data.push(gitsource + fakeId[0] + ".txt#" + fakeId[1]);
          }

          res_data["words"] = words_data;
          res_data["ref_lines"] = ref_lines_data;
          res_data["books"] = books_data;
          res_data["mongo_ids"] = mongo_ids_data;

          container["res_data"] = res_data;
          
          res.json(res_data);
        })
      })
  })
})
