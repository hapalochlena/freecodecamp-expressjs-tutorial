const express = require('express');
const app = express();

// to do: import stuff from data.js and use it here

const { products } = require('./data')


app.get('/', (req, res) => {
  // res.json([{ name: 'john' }, { name: 'susan' }])
  res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

// only sending certain aspects of the products
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const {id,name,image} = product;  // ! pay attention to syntax
    return {id,name,image}
  })
  res.json(newProducts)
})

// show only first product
// app.get('/api/products/1', (req, res) => {
//   const singleProduct = products.find((product) => product.id === 1)
//   res.json(singleProduct)
// })
// OVERKILL => We can't set up a route like this for each of 400 products!
// => instead use ROUTE PARAMETERS

// route parameter:
app.get('/api/products/:productID', (req, res) => {    // ! :param
  console.log(req.params); // { productID: '1' }
  const { productID } = req.params; // ! syntax
  console.log(productID); // "2" (string!!)
  console.log(Number(productID)); // 2 (number)
  const singleProduct = products.find((product) => product.id === Number(productID)) // => not necessary if the id is already set up as a string instead of a number (= not in this case), which would be typical for databases

  // give me the singleProduct, except if that product doesn't exist (because user has put in url e.g. "api/products/abc")
  if (!singleProduct) {
    return res.status(404).send("Product not found")
  }

  return res.json(singleProduct)
})


// ROUTE PARAMETERS can get way more complicated:
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)

})

// <––> QUERY STRING / URL PARAMETERS
// => send small amounts of information to the server
// People who set up the server decide what params will be accepted, and what functionality depends on them.

// Here, we will set up a new route for the query params; later we will see how to combine both routes
app.get('/api/v1/query', (req, res) => {
  // console.log(req.query); // => console: { name: 'john', id: '2' }
  const { search, limit } = req.query // ! interesting syntax => we are basically assuming here that 'search' and 'limit' might appear as query string params in the request; we check below in the if statement whether they actually do appear
  let sortedProducts = [...products];

  // If 'search' is in my query string parameters, then I want to filter my products
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search)  // ? why do we use 'return' here..? wouldn't it stop the code..?
    })
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }

  // so we don't return an empty array:
  if (sortedProducts < 1) {   // = if the array of products we arrive at after the search and limit above is 0 i.e. empty
    // res.status(200).send('no products matched your search')

    // more common:
    return res.status(200).json({ success: true, data: [] }) // ! we need 'return' here so that the code stops here. otherwise we would have 2 responses (this one and the one below), which would throw an error
  }

  res.status(200).json(sortedProducts)

  // res.send('hello world')
})
// url: '/api/v1/query' => console: {}
// url: 'http://localhost:3000/api/v1/query?name=john' => console: { name: 'john' }
// url: 'http://localhost:3000/api/v1/query?search=a&limit=2' => ALL PRODUCTS THAT START WITH 'A'


app.listen(3000, () => {
  console.log('Server is listening on port 3000....');
})
