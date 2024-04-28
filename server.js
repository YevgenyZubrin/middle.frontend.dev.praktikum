// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

app.use(express.static(resolve(__dirname, 'build')))

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
