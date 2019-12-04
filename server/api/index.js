const router = require('express').Router()
module.exports = router

router.use('/volunteers', require('./volunteer'))
router.use('/organizations', require('./organization'))
router.use('/events', require('./event'))

router.use((req, res, next) => {
  console.log('ERROR\n\n')
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
