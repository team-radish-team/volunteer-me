const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
  },
  contactFirstName: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
  },
  contactLastName: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
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
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
  },
  missionStatement: {
    type: Sequelize.TEXT,
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
  },
  webUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  orgImage: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
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
Organization.prototype.correctPassword = function(candidatePwd) {
  return (
    Organization.encryptPassword(candidatePwd, this.salt()) === this.password()
  )
}

/**
 * classMethods
 */
Organization.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Organization.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = organization => {
  if (organization.changed('password')) {
    organization.salt = Organization.generateSalt()
    organization.password = Organization.encryptPassword(
      organization.password(),
      organization.salt()
    )
  }
}

Organization.beforeCreate(setSaltAndPassword)
Organization.beforeUpdate(setSaltAndPassword)
Organization.beforeBulkCreate(organizations => {
  organizations.forEach(setSaltAndPassword)
})

module.exports = Organization
