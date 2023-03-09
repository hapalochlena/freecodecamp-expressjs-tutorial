const http = require('http')
const { readFileSync } = require('fs');

// WHY readFileSYNC AND NOT readFile ?
// 1. We are not invoking this every time someone comes to the server
// => we require the file when we instantiate our server * (when the server starts running); NOT when the request comes in

// get all files
const homePage = readFileSync('./navbar-app/index.html') // * HERE
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeImage= readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req, res) => {
  // console.log(req.url);
  const url = req.url
  //  home page
  if (url === '/') {
    res.writeHead(200, {'content-type': 'text/html'})
    res.write(homePage)
    res.end();
  // about page
  } else if (url === '/about') {
    res.writeHead(200, {'content-type': 'text/html'})
    res.write('<h1>About Page</h1>')
    res.end();
  // styles
  } else if (url === '/styles.css') {
    res.writeHead(200, {'content-type': 'text/css'})
    res.write(homeStyles)
    res.end();
  // logo
  } else if (url === '/logo.svg') {
    res.writeHead(200, {'content-type': 'image/svg+xml'})
    res.write(homeImage)
    res.end();
  // logo
  } else if (url === '/browser-app.js') {
    res.writeHead(200, {'content-type': 'text/javascript'})
    res.write(homeLogic)
    res.end();
  // 404
  } else {
    res.writeHead(404, {'content-type': 'text/html'})
    res.write('<h1>Page Not Found</h1>')
    res.end();
  }
})

server.listen(3000)

// WHY EXPRESS?
// Because if you have a website with tons of resources, you would need to set up
// every single resource in this manner.
