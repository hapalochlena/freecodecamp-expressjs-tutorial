// Middleware = functions that execute during the request to the server
// "Express is basically a whole bunch of middleware"

const express = require('express')
const app = express()
// req => middleware => res

// Start by logging some things from the request => the bigger our apps get, it becomes very useful to log these things
// => Make a separate function for this + attach it to all the different routes

const logger = (req, res, next) => {      // EXPRESS passes behind the scenes the req, res, next parameters to the middleware function
  const method = req.method;
  const url = req.url;
  // const { method, url } = req;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  // res.send('Test')   // !!! either do res.send directly, or (usually), PASS ON TO NEXT MIDDLEWARE with "next" -- otherwise, nothing shows up in browser
  next() // in this case: pass it on to our next method, which is app.get
}

app.get('/', logger, (req, res) => {  // ! logger = MIDDLEWARE
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
})
