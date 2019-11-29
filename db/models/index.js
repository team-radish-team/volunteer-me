const Event = require('./Event')
const Organization = require('./Organization')
const Volunteer = require('./Volunteer')
const Category = require('./Category')
const VolunteerEvent = require('./VolunteerEvent')

Volunteer.belongsToMany(Event, {through: VolunteerEvent})

Organization.hasMany(Event)
Event.belongsTo(Organization)

Volunteer.belongsToMany(Category, {through: 'VolunteerCategory'})
Category.belongsToMany(Volunteer, {through: 'VolunteerCategory'})

Category.hasMany(Organization)
// Organization.belongsTo(Category)

module.exports = {
  Event,
  Organization,
  Volunteer,
  Category,
  VolunteerEvent
}
