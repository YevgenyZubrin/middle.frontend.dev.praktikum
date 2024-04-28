// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express'
import { resolve } from 'path'

const app = express()

app.use(express.static(resolve(__dirname, 'build')))
