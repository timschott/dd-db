// server js creates app and sets up routing services. 
const express = require('express');

const port = 8000;

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

// test homepage
app.get('/api/customers-test', (req, res) => {
  // inject content into FE - React should be able to template this into a file.

  const customers = [
    {id: 1, firstName: 'Tim', lastName: 'Schott'},
    {id: 2, firstName: 'Will', lastName: 'Brayshaw'},
    {id: 3, firstName: 'Bruce', lastName: 'Kay'},
  ];

  res.json(customers);
})

// have db already.
app.get('/api/test-words', (req, rest) => {
  db.collection("texts", runQuery);
});


function displayContent(cursor, pretty) {
  
  cursor.toArray(function(err, itemArr) {
    var contentList = [];
    for(var i=0; i<itemArr.length; i++) {
      contentList.push(itemArr[i].Content);
    }
    console.log(JSON.stringify(contentList));
  });
}

function runQuery(err, texts) {

  texts.find( { Book: "Libra" }, { _id: 0, FakeID: 0 } , function( err, cursor) {
    displayContent(cursor.limit(5));
  });
}