const Sequelize = require('sequelize')
const db = require('../db')

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  contactFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  contactLastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  contactEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contactPhone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  missionStatement: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  webUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Organization
