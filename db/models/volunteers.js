const Sequelize = require('sequelize')
const db = require('../db')

const Volunter = db.define('volunteer', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  interests: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  profilePic: {
    type: Sequelize.STRING
  }
})
