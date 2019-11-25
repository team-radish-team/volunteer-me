const Sequelize = require('sequelize')
const db = require('../db')

const VolunteerEvent = db.define('VolunteerEvent', {})

module.exports = VolunteerEvent
