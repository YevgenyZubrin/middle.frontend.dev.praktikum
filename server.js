const express = require('express')
const { resolve } = require('path')

const app = express()

const PORT = 3000

app.use(express.static(resolve(__dirname, 'build')))

app.listen(PORT, () => {
  console.log(`Local:   http://127.0.0.1:${PORT}`)
})