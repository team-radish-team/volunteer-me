const Sequelize = require('sequelize')
const db = require('../db')
const neo4j = require('neo4j-driver').v1

const {neo4jsecret} = require('../../secrets')

// :7687

var driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'teamRadish')
)
driver.onCompleted = () => {
  console.log('Driver created')
}
const session = driver.session()

// const afterCreate = volunteerEvent => {
//     session.run(
//       `MERGE (v:Volunteer{id: ${volunteerEvent.volunteerId} })-[rel:HAS_ATTENDED]->(e:Event{id:${volunteerEvent.eventId}})`
//     )
// }

const VolunteerEvent = db.define('VolunteerEvent', {
  //   hooks: {
  //     afterCreate: function(volunteerEvent) {
  //       console.log('afterCreate')
  //     }
  //   }
})

VolunteerEvent.afterBulkCreate(function(volunteerEvents) {
  volunteerEvents.map(volunteerEvent =>
    session.run(
      `MERGE (v:Volunteer{id: ${volunteerEvent.volunteerId} }) MERGE (e:Event{id:${volunteerEvent.eventId}}) MERGE (v)-[:HAS_ATTENDED]->(e)`
    )
  )
  session.close()
})

// VolunteerEvent.addHook('afterCreate', function(volunteerEvent) {
//   console.log('afterCreate')
// })

module.exports = VolunteerEvent
