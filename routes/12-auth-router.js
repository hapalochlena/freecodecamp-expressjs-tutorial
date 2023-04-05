const express = require('express');
// instead of app => router:
const router = express.Router();

router.post('/', (req, res) => {    // ! only '/' because '/login' already in app.js
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide credentials')
})

module.exports = router
