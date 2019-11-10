import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import router from './routes'
import { HttpError } from 'http-errors'

const port = 3001
const app = express()

app.use(helmet())
app.use(logger('combined'))
app.use(express.json())
router(app)

function onError(error: HttpError) {
  if (error.syscall !== 'listen') throw error
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

if (process.env.NODE_ENV === 'development') {
  const http = require('http')
  const server = http.createServer(app)
  server.listen(port, 'localhost');
  server.on('error', onError);
  server.on('listening', () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`;
    console.log(`Listening on ${bind}`);
  })
}

export default app
