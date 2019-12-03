const router = require('express').Router()
const {Event, Organization} = require('../../db/models')
const moment = require('moment')
module.exports = router

/**
 *  GET all active events (api/events)
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

/**
 *  POST new event
 */
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const date = moment(req.body.dateOfEvent)
      .format('YYYY MM DD')
      .split(' ')
      .join('-')
    const startTime = req.body.eventStart.toString().slice(11, 19)
    const endTime = req.body.eventEnd.toString().slice(11, 19)
    const event = await Event.create({
      title: req.body.eventName,
      startTime: `${date} ${startTime}`,
      endTime: `${date} ${endTime}`,
      address: req.body.address,
      description: req.body.description,
      volunteerCount: 0,
      volunteerTargetNum: req.body.volunteersNeeded,
      isActive: true
    })
    res.json(event).status(200)
  } catch (error) {
    next(error)
  }
})
