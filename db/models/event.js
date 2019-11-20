const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  volunteerTargetNum: {
    type: Sequelize.INTEGER
  },
  eventImage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Event
