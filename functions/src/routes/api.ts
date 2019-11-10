import express from 'express'

const router = express.Router()

router.get('/users', (_, res) => {
  res.json([{ name: 'foo' }, { name: 'bar' }])
})

export default router
