const faker = require('faker')

const dummyVolunteers = [
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'linda@linda.com',
    phone: faker.phone.phoneNumber(),
    interests: ['animals', 'youth'],
    profilePic: faker.image.avatar(),
    password: '12345'
  },
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'steve@steve.com',
    phone: faker.phone.phoneNumber(),
    interests: ['animals', 'advocacy', 'education'],
    profilePic: faker.image.avatar(),
    password: '12345'
  }
]

module.exports = {dummyVolunteers}
