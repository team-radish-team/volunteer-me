const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Volunteer = db.define('volunteer', {
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
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

/**
 * instanceMethods
 */
Volunteer.prototype.correctPassword = function(candidatePwd) {
  return (
    Volunteer.encryptPassword(candidatePwd, this.salt()) === this.password()
  )
}

/**
 * classMethods
 */
Volunteer.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Volunteer.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = volunteer => {
  if (volunteer.changed('password')) {
    volunteer.salt = Volunteer.generateSalt()
    volunteer.password = Volunteer.encryptPassword(
      volunteer.password(),
      volunteer.salt()
    )
  }
}

Volunteer.beforeCreate(setSaltAndPassword)
Volunteer.beforeUpdate(setSaltAndPassword)
Volunteer.beforeBulkCreate(volunteers => {
  volunteers.forEach(setSaltAndPassword)
})

module.exports = Volunteer
