const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('bar-app')
})

app.listen(port, () => {
  console.log(`bar app listening at http://localhost:${port}`)
})