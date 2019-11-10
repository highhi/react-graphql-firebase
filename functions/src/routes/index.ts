import express from 'express'
import cors, { CorsOptions } from 'cors'
import apollo from '../graphql'
import apiRoute from './api'
import errorRoute from './error'

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5020']
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  allowedHeaders: 'Content-Type',
  maxAge: 100,
}

export default function router(app: express.Application) {
  app.use('/api', cors(corsOptions), apiRoute)

  apollo.applyMiddleware({ 
    app,
    cors: { ...corsOptions, maxAge: 180 } // GraphQLのリクスエトは全てPOSTなので少し長めに設定しておく
  })
  app.use(errorRoute)
}
