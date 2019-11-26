const router = require('express').Router()
const {Event} = require('../../db/models')
module.exports = router

/**
 *  GET all events (api/events)
 */
router.get('/', async (req, res, next) => {
  try {
    let allEvents = await Event.findAll({where: {isActive: true}})
    console.log(allEvents)
    res.json(allEvents).status(200)
  } catch (error) {
    console.log('error')
    next(error)
  }
})
