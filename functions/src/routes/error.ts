import express from 'express'
import httpErrors from 'http-errors'

const router = express.Router()

// catch 404 and forward to error handler
router.use((_, __, next) => {
  next(httpErrors(404))
})

// error handler
router.use((err: any, _: any, res: express.Response, __: any) => {
  res.status(err.status || 500)
  res.send(err.message)
})

export default router
