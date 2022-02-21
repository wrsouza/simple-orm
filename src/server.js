import express, { json } from 'express'
import routes from './routes'

const server = express()
server.use(json())
server.use(routes)

export default server