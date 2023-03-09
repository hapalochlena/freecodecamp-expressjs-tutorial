const express = require('express');
const path = require('path');
const app = express();


// setup static and middleware
app.use(express.static('./public'))   // convention to call this folder 'public' or 'static'
// static asset = a file that server doesn't have to change
// = the html file, the style.css files, the image files, the JS files

// ... wait a second?! why also the JS file? JS is for making sites dynamic, so why is it a "static file"?
// => Yes, it is dynamic in the BROWSER.
// But as far as the SERVER is concerned, it is just an asset that doesn't need to change.
// (<–> Later, we will see Server-Side Rendering.)

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
//   OPTION 1) ADDING TO STATIC ASSETS
//   OPTION 2) SSR
// })

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})


app.listen(3000, () => {
  console.log('server is listening on port 3000.......');
});
