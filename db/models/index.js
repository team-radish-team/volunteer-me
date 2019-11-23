const Event = require('./event')
const Organization = require('./organization')
const Volunteer = require('./volunteer')
const Category = require('./category')

Volunteer.hasMany(Event)
Event.belongsToMany(Volunteer, {through: 'VolunteerEvent'})

Organization.hasMany(Event)
Event.belongsTo(Organization)

Category.hasMany(Volunteer)
Volunteer.belongsToMany(Category, {through: 'VolunteerCategory'})

Category.hasMany(Organization)
Organization.belongsTo(Category)

module.exports = {
  Event,
  Organization,
  Volunteer,
  Category
}
