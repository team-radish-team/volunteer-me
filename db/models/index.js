const Event = require('./event')
const Organizaiton = require('./organization')
const Volunteer = require('./volunteer')

Volunteer.hasMany(Event)
Event.belongsToMany(Volunteer)

Organizaiton.hasMany(Event)
Event.belongsTo(Organizaiton)

module.exports = {
  Event,
  Organizaiton,
  Volunteer
}
