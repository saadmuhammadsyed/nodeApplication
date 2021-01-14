const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello to the DevOps World!')
})

app.listen(port, () => {
  console.log(`NodeJS new server listening at http://localhost:${port}`)
})
