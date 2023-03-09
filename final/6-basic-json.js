const express = require('express');
const app = express();

// to do: import stuff from data.js and use it here

const { products } = require('./data')


app.get('/', (req, res) => {
  // res.json([{ name: 'john' }, { name: 'susan' }])
  res.json(products)
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000....');
})
