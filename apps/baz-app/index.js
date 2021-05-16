const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('baz app')
})

app.listen(port, () => {
  console.log(`baz app listening at http://localhost:${port}`)
})