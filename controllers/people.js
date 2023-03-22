let { people } = require('../data.js')

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people })
}
// copied + modified from routes/people.js:
// router.get('/', (req, res) => {
//   res.status(200).json({ success: true, data: people })
// })

const createPerson = (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ success: false, msg: 'Please provide value' })
  }
  res.status(201).json({ success:true, person: name}) // 201 = successful post request
}

const createPersonPostman = (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide value' })
  }
  res.status(201).json({ success:true, person: name})
}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter((person) => person.id !== Number(req.params.id) )
  res.status(200).json({ success: true, data: newPeople })
}



module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson
}
