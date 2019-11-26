const router = require('express').Router()
module.exports = router

router.use('/events', require('./event'))
router.use('/volunteers', require('./volunteer'))

router.use((req, res, next) => {
  console.log('ERROR\n\n')
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
