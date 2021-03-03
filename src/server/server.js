// server js creates app and sets up routing services. 
const express = require('express');

const port = 8000;

// create new express app and save it as "app"
const app = express()


// debug
app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

// test homepage
app.get('/', function(req, res) {
  res.send('Hello World')
})