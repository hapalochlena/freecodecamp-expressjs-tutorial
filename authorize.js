const authorize = (req, res, next) => {
  const { user } = req.query // in case the user doesn't provide the user query
  if (user === 'john') {  // specific case where user is john
    req.user = { name: 'john', id: 3}
    next() // ! again: we need next() here, otherwise everything breaks!
  }
  else {
    res.status(401).send('Unauthorized')
  }
}

// url in order to access the page = http://localhost:3000/?user=john

module.exports = authorize
