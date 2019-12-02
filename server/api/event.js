const router = require('express').Router()
const {Event, Organization} = require('../../db/models')
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
    console.log(data)
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
