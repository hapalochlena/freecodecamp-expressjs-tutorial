const express = require('express')
const app = express()
let { people } = require('./data.js')

// static assets
app.use(express.static('./methods-public'))

app.get('/api/people', (req, res) => {
  res.status(200).json({success: true, data: people})
})


// INDEX.HTML CONTAINS FORM

// create the middleware to actually handle the data that the form sends us
// = parse form data => add data to req.body
app.use(express.urlencoded({ extended: false }))
// => now the result of the form is stored in req.body !

// write method to handle the route "/login", where the result of the form is posted to
app.post('/login', (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide credentials')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
})
