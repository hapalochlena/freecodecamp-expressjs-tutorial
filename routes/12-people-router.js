const express = require('express');
// instead of app => router:
const router = express.Router();

// let { people } = require('../data.js') // ! MOVED to controllers/people.js

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson
} = require('../controllers/12-people-controller.js')

router.get('/', getPeople) // = just importing the callback function from controllers folder
router.post('/', createPerson)
router.post('/postman', createPersonPostman)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)


// ALTERNATIVE WAY of setting up the routes:
router.route('/').get(getPeople).post(createPerson) // = chain them
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)


module.exports = router
