const router = require('express').Router()
const {Event, Organization} = require('../../db/models')
module.exports = router

/**
 *  GET all events (api/events)
 */
router.get('/', async (req, res, next) => {
  try {
    let allEvents = await Event.findAll({
      where: {isActive: true},
      include: [{model: Organization}]
    })
    res.json(allEvents).status(200)
  } catch (error) {
    console.log('error')
    next(error)
  }
})

/**
 *  GET all organization events (api/events/organization)
 */
router.get('/:organizationid', async (req, res, next) => {
  try {
    let orgEvents = await Event.findAll({
      where: {organizationId: req.params.organizationid},
      include: [{model: Organization}]
    })
    res.json(orgEvents).status(200)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
