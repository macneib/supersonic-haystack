const express = require('express')
const app = express()
const port = 3000
const baz = require('../../commons/bazlib');

app.get('/', (req, res) => {
  res.send('baz app', baz);
})

app.listen(port, () => {
  console.log(`baz app listening at http://localhost:${port}`)
})