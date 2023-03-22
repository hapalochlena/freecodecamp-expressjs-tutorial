const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

const morgan = require('morgan') // example for third-party middleware function

// app.use(logger)
// ... so we don't have to add "logger" as an argument to each single route!

// app.use('/api', logger)
// also provide path "/api" as argument
// => logger will be applied to ANY route that comes after "/api", be it "home", "about", "products" ...

// app.use([logger, authorize])   => only need this line if we want to use logger & authorize middleware for ALL the routes
// app.use(express.static('./public')) // example for express built-in middleware function
app.use(morgan('tiny')) // example for third-party middleware function

app.get('/', (req, res) => {  // ! logger = MIDDLEWARE
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
// app.get('/api/items', (req, res) => {
//   console.log(req.user); // cool: now we can log the user info when the items page is accessed
//   res.send('Items')
// })

// if we wanted to only use the middleware for this /api/items route:
app.get('/api/items', [logger, authorize], (req, res) => {
  console.log(req.user); // cool: now we can log the user info when the items page is accessed
  res.send('Items')
})
// then comment out the line above:
// app.use([logger, authorize])

app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
})



///==============

// MIDDLEWARE INFO

// Options for middleware: our own - express (built-in mw functions) - third party

// express built-in:
// app.use(express.static('./public'))

// example for third-party:
// morgan => install with npm
