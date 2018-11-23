const port = 8083
const express = require('express')
const path = require('path')
const compression = require('compression')


const app = express()

app.use(compression())

app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.listen(port)
console.log(`Server started: http://127.0.0.1:${port}`)
