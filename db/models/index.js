const Event = require('./event')
const Organization = require('./organization')
const Volunteer = require('./volunteer')
const Category = require('./category')
const VolunteerEvent = require('./volunteerEvent')

Volunteer.belongsToMany(Event, {through: VolunteerEvent})
Event.belongsToMany(Volunteer, {through: VolunteerEvent})

Organization.hasMany(Event)
Event.belongsTo(Organization)

Volunteer.belongsToMany(Category, {through: 'VolunteerCategory'})
Category.belongsToMany(Volunteer, {through: 'VolunteerCategory'})

Category.hasMany(Organization)

module.exports = {
  Event,
  Organization,
  Volunteer,
  Category,
  VolunteerEvent
}
