const faker = require('faker')

const dummyVolunteers = [
  {
    firstName: 'Linda',
    lastName: 'Smith',
    email: 'linda@linda.com',
    phone: '847-225-2235',
    interests: ['animals', 'youth', 'hunger'],
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
