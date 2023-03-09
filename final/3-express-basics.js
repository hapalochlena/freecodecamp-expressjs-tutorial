const express = require('express');
const app = express();
// could also do sth like this in one line:
// const app = require('express')(); => directly invoke it

// app.get
// app.post
// app.put
// app.delete
// app.all => handles all HTTP arguments (get, post, put, delete)
// app.use
// app.listen



// app.get
app.get('/', (req, res) => {    // path = what resource the user is trying to access
  console.log('user hit the resource');
  res.status(200).send('Home Page')
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})


// app.all => for 404 response
app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>')
})


// app.listen
app.listen(3000, () => {    // bascially same as http => server.listen()
  console.log('Server is listening on port 3000...');
})
