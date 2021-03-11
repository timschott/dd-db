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
app.get('/api/customers-test', (req, res) => {
  // inject content into FE - React should be able to template this into a file.

  const customers = [
    {id: 1, firstName: 'Tim', lastName: 'Schott'},
    {id: 2, firstName: 'Will', lastName: 'Brayshaw'},
    {id: 3, firstName: 'Bruce', lastName: 'Kay'},
  ];

  res.json(customers);
})

// test homepage
app.get('/', (req, res) => {
  const hello = "HELLO!";
  res.json(hello);
})