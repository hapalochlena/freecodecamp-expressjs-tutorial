const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  // const { method, url } = req;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  // res.send('Test')   // !!! either do res.send directly, or (usually), PASS ON TO NEXT MIDDLEWARE with "next" -- otherwise, nothing shows up in browser
  next() // in this case: pass it on to our next method, which is app.get
}

module.exports = logger
