// Create FOLDER controllers
// ! => Only people.js in there, because login only has 1 route anyways

const express = require('express')
const app = express()

// * IMPORT THE ROUTES from Router
let people = require('./routes/12-people-router.js')
const auth = require('./routes/12-auth-router.js')
// ***

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())


// * THIS NEW app.use INSTEAD OF ALL THE SINGLE ROUTES
app.use('/api/people', people) // ! because we already have 'api/people' here, we remove 'api/people' in people.js for ALL ROUTES to just '/'

// * Same for LOGIN:
app.use('/login', auth)


app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
})
