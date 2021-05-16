const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('foo app')
})

app.listen(port, () => {
  console.log(`foo app listening at http://localhost:${port}`)
})