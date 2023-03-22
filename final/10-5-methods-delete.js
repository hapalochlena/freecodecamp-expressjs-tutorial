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
  res.status(401).send('Please provide credentials')
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
    return res.status(400).json({ success: false, msg: 'Please provide value' })
  }
  res.status(201).json({ success:true, person: name}) // 201 = successful post request
})

//

// Postman
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide value' })
  }
  res.status(201).json({ success:true, person: name})
})


// PUT METHOD

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  // console.log(id, name);
  // res.json({ success: true, data: {id, name}})

  const person = people.find((person) => person.id === Number(id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name // update the name of this person (with this id) with the new name passed in the body
    }
    return person // all other original persons just get returned with their original name
  })
  res.status(200).json({ success: true, data: newPeople })
})



// DELETE METHOD
// very similar to put, except we're not expecting anything in the body

app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter((person) => person.id !== Number(req.params.id) )
  res.status(200).json({ success: true, data: newPeople })
})



app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
})
