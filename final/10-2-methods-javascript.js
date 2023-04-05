const express = require('express')
const app = express()
let { people } = require('./data.js')

// static assets
app.use(express.static('./methods-public'))

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

// parse form data
app.use(express.urlencoded({ extended: false }))

app.post('/login', (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide credentials') // 401 = unauthorized (?)
})

//

// NEW JAVASCRIPT FORM AXIOS STUFF

// new middleware to parse json data
app.use(express.json())
// => analoglous to app.use(express.urlencoded) for traditional form, this gives us now access
// to the result of the javascript form to use in the app.post('/api/people') method, analogous
// to the app.post('/login') method

app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ success: false, msg: 'Please provide value' }) // 400 = bad request
  }
  res.status(201).json({ success: true, person: name}) // 201 = successful post request
})

//


app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
})
