const express = require('express');
// instead of app => router:
const router = express.Router();

let { people } = require('../data.js')

router.get('/', (req, res) => {   // ! because we already have 'api/people' in app.js, we remove 'api/people' here to just '/'
  res.status(200).json({ success: true, data: people })
})

router.post('/', (req, res) => {    // ! same here
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ success: false, msg: 'Please provide value' })
  }
  res.status(201).json({ success:true, person: name}) // 201 = successful post request
})

router.post('/postman', (req, res) => {   // ! same here
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide value' })
  }
  res.status(201).json({ success:true, person: name})
})

router.put('/:id', (req, res) => {    // ! same here
  const { id } = req–.params
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

router.delete('/:id', (req, res) => {    // ! same here
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter((person) => person.id !== Number(req.params.id) )
  res.status(200).json({ success: true, data: newPeople })
})

module.exports = router
