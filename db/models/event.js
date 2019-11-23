const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  volunteerTargetNum: {
    type: Sequelize.INTEGER
  }
})

module.exports = Event
