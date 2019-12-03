const router = require('express').Router()
const {Event, Organization} = require('../../db/models')
const moment = require('moment')
module.exports = router

/**
 *  GET all events (api/events)
 */
router.get('/', async (req, res, next) => {
  try {
    let allEvents = await Event.findAll({
      include: [{model: Organization}]
    })
    res.json(allEvents).status(200)
  } catch (error) {
    console.log('error')
    next(error)
  }
})

/**
 *  GET all related events through neo4j
 */
const neo4j = require('neo4j-driver').v1
var driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'teamRadish')
)
driver.onCompleted = () => {
  console.log('Driver created')
}
const session = driver.session()

router.get('/neo4j/:volunteerId/:eventId', async (req, res, next) => {
  try {
    let data = await session.run(`MATCH (me:Volunteer {volunteerId: ${req.params.volunteerId}})-[:HAS_ATTENDED]->(e:Event{eventId: ${req.params.eventId}}),
    (newEv:Event)<-[:HAS_ATTENDED]-(other:Volunteer)-[:HAS_ATTENDED]->(e)
    RETURN collect(newEv.eventId)`)
    console.log(data)
    res.json(data).status(200)
  } catch (error) {
    next(error)
  }
})

router.put('/time/:eventId', async (req, res, next) => {
  try {
    console.log('reqParmId', req.params.eventId)
    let event = await Event.findByPk(req.params.eventId)
    await event.update({
      isActive: false
    })
    res.json(event).status(200)
  } catch (error) {
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
    const organization = await Organization.findByPk(req.body.organizationId)
    organization.addEvent(event)
    res.json(event).status(200)
  } catch (error) {
    next(error)
  }
})
