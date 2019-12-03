const router = require('express').Router()
const {
  Event,
  Organization,
  Volunteer,
  VolunteerEvent
} = require('../../db/models')
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
    res.json(data).status(200)
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
 *  GET all volunteer events (api/events/:volunteerId)
 */
router.get('/volunteer/:volunteerId', async (req, res, next) => {
  try {
    let volunteer = await Volunteer.findByPk(req.params.volunteerId, {
      include: [{model: Event, include: [{model: Organization}]}]
    })

    res.json(volunteer)
  } catch (error) {
    next(error)
  }
})

/**
 *  POST new event
 */
router.post('/', async (req, res, next) => {
  try {
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
    await organization.addEvent(event)
    const actualEvent = await Event.findOne({
      where: {title: req.body.eventName},
      include: [{model: Organization}]
    })
    res.json(actualEvent).status(200)
  } catch (error) {
    next(error)
  }
})

/**
 *  ADD volunteer to event (api/events/:eventId)
 */
router.patch('/:eventId', async (req, res, next) => {
  try {
    let event = await Event.findByPk(req.params.eventId)
    await event.increment('volunteerCount', {by: 1})
    let allEvents = await Event.findAll({
      include: [{model: Organization}],
      order: [['id', 'ASC']]
    })
    res.json(allEvents)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
