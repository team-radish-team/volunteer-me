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
 *  GET all events (api/events)
 */
router.get('/', async (req, res, next) => {
  try {
    let allEvents = await Event.findAll({
      include: [{model: Organization}, {model: Volunteer}],
      order: [['id', 'ASC']]
    })
    res.json(allEvents).status(200)
  } catch (error) {
    console.error('error')
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

router.get('/neo4j/:volunteerId/', async (req, res, next) => {
  try {
    // let data = await session.run(`MATCH (me:Volunteer {volunteerId: ${req.params.volunteerId}})-[:HAS_ATTENDED]->(e:Event{eventId: ${req.params.eventId}}),
    // (newEv:Event)<-[:HAS_ATTENDED]-(other:Volunteer)-[:HAS_ATTENDED]->(e)
    // RETURN collect(newEv.eventId)`)
    let data = await session.run(`MATCH (me:Volunteer {volunteerId: ${req.params.volunteerId}})-[:HAS_ATTENDED]->(myEv),
(newEv:Event)<-[:HAS_ATTENDED]-(other:Volunteer)-[:HAS_ATTENDED]->(myEv:Event)
WHERE NOT (newEv)--(me)
RETURN  collect(newEv.eventId) AS newEvList`)
    res.json(data).status(200)
  } catch (error) {
    next(error)
  }
})

router.put('/time/:eventId', async (req, res, next) => {
  try {
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
      include: [{model: Organization}],
      order: [['id', 'ASC']]
    })
    res.json(orgEvents).status(200)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// GET one event
router.get('/:eventId', async (req, res, next) => {
  try {
    let event = await Event.findByPk(Number(req.params.eventId), {
      include: [{model: Organization}]
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})

/**
 *  GET all events associated with volunteer (api/events/:volunteerId)
 */
router.get('/volunteer/:volunteerId', async (req, res, next) => {
  try {
    let volunteer = await Volunteer.findByPk(req.params.volunteerId, {
      include: [{model: Event, include: [{model: Organization}]}],
      order: [['id', 'ASC']]
    })

    res.json(volunteer)
  } catch (error) {
    next(error)
  }
})

/**
 *  GET all volunteers associated with event (api/events/event/:eventId)
 */
router.get('/event/:eventId', async (req, res, next) => {
  try {
    let volunteers = await Event.findByPk(req.params.eventId, {
      include: [{model: Volunteer}],
      order: [['id', 'ASC']]
    })

    res.json(volunteers)
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
    console.log(req.body)
    let event = await Event.findByPk(Number(req.params.eventId))

    let volunteer = await Volunteer.findByPk(req.body.volunteerId)

    await event.increment('volunteerCount', {by: 1})
    await volunteer.addEvent(event)
    let allEvents = await Event.findAll({
      include: [{model: Organization}, {model: Volunteer}],
      order: [['id', 'ASC']]
    })
    res.json(allEvents)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// Edit Event Form

router.patch('/:eventId', async (req, res, next) => {
  try {
    const date = moment(req.body.dateOfEvent)
      .format('YYYY MM DD')
      .split(' ')
      .join('-')
    const startTime = req.body.eventStart.toString().slice(11, 19)
    const endTime = req.body.eventEnd.toString().slice(11, 19)
    await Event.update(
      {
        title: req.body.eventName,
        description: req.body.description,
        volunteersTargetNum: req.body.volunteersNeeded,
        address: req.body.address,
        startTime: `${date} ${startTime}`,
        endTime: `${date} ${endTime}`
      },
      {where: {id: Number(req.params.eventId)}}
    )
    const updatedEvent = await Event.findByPk(Number(req.params.eventId))
    res.status(200).json(updatedEvent)
  } catch (error) {
    next(error)
  }
})
