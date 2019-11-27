const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const neo4j = require('neo4j-driver').v1
var driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'teamRadish')
)
driver.onCompleted = () => {
  console.log('Driver created')
}
const session = driver.session()

const Volunteer = db.define('volunteer', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
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
    allowNull: false
    // validate: {
    //   isEmpty: false
    // }
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

Volunteer.afterCreate(function(volunteer) {
  session.run(
    `MERGE (v:Volunteer{volunteerId: ${volunteer.dataValues.id}}) ON MATCH SET v.interests = split('${volunteer.dataValues.interests}', ',') ON CREATE SET v.interests = split('${volunteer.dataValues.interests}', ',')`
  )
})

//ON CREATE SET v.interests=split([ 'agriculture', 'environment' ], ',') ON MATCH SET v.interests=collect(${volunteer.dataValues.interests})
//session.close()

module.exports = Volunteer
