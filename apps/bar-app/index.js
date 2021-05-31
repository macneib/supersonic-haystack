const express = require('express')
const app = express()
const port = 3000

const bar = require('../../commons/barlib');

app.get('/', (req, res) => {
  res.send('bar-app', bar);
})

app.listen(port, () => {
  console.log(`bar app listening at http://localhost:${port}`)
})