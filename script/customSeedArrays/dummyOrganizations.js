const faker = require('faker')
const {
  organizationNames,
  missionStatements,
  organizationUrls,
  addresses,
  photoUrls
} = require('./customOrganizationSeed')

const dummyOrganizations = [
  {
    name: 'Dogs for Dogs',
    contactFirstName: faker.name.firstName(),
    contactLastName: faker.name.lastName(),
    contactEmail: 'dogs@dogs.com',
    contactPhone: faker.phone.phoneNumber(),
    missionStatement: 'We love Dogs.',
    webUrl: 'dogsfordogs.com',
    orgImage: photoUrls[2],
    address: addresses[5],
    password: '12345'
  },
  {
    name: 'Cats for Cats',
    contactFirstName: faker.name.firstName(),
    contactLastName: faker.name.lastName(),
    contactEmail: 'cats@cats.com',
    contactPhone: faker.phone.phoneNumber(),
    missionStatement: 'We love Cats.',
    webUrl: 'catsforcats.com',
    orgImage: photoUrls[4],
    address: addresses[2],
    password: '12345'
  }
]

module.exports = {dummyOrganizations}
