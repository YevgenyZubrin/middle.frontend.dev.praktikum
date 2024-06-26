// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

// Middleware для обработки статических файлов
app.use(express.static(resolve(__dirname, 'build')))

// Middleware для обработки всех остальных маршрутов
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, 'build', 'index.html'))
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
