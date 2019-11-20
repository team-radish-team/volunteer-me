const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/volunteer-me', {
  logging: false
})
module.exports = db
