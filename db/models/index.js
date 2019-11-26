const Event = require('./event')
const Organization = require('./organization')
const Volunteer = require('./volunteer')
const Category = require('./category')
const VolunteerEvent = require('./VolunteerEvent')

Volunteer.belongsToMany(Event, {through: VolunteerEvent})

Organization.hasMany(Event)
Event.belongsTo(Organization)

Volunteer.belongsToMany(Category, {through: 'VolunteerCategory'})
Category.belongsToMany(Volunteer, {through: 'VolunteerCategory'})

Category.hasMany(Organization)
Organization.belongsTo(Category)

module.exports = {
  Event,
  Organization,
  Volunteer,
  Category,
  VolunteerEvent
}
