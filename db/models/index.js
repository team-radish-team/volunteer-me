const Event = require('./event')
const Organizaiton = require('./organization')
const Volunteer = require('./volunteer')
const Category = require('./category')

Volunteer.hasMany(Event)
Event.belongsToMany(Volunteer)

Organizaiton.hasMany(Event)
Event.belongsTo(Organizaiton)

Category.hasMany(Volunteer)
Volunteer.belongsToMany(Category)

Category.hasMany(Organizaiton)
Organizaiton.belongsTo(Category)

module.exports = {
  Event,
  Organizaiton,
  Volunteer,
  Category
}
