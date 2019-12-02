const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios')

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
  latitude: {
    type: Sequelize.STRING
  },
  longitude: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  volunteerCount: {
    type: Sequelize.INTEGER
  },
  volunteerTargetNum: {
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN
  }
})

// Event.beforeCreate(function(event) {
//   let lat, long
//   const address = `${event.address} chicago il`
//     await axios
//       .get(
//         `https://us1.locationiq.com/v1/search.php?key=683f12733c5177&q=${address}&format=json`
//       )
//       .then(response => response.json())
//       .then(response => {
//         lat = response[0].lat
//         long = response[0].lon
//       })
//     event.latitude = lat
//     event.longitude = long
// })

module.exports = Event
