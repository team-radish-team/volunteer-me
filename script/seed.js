const db = require('../db/db')
const faker = require('faker')
const {
  Category,
  Event,
  Organization,
  Volunteer,
  VolunteerEvent
} = require('../db/index')

//dummyEvents Imports
const {dummyEvents} = require('./customSeedArrays/dummyEvents')

//dummyVolunteers Imports
const {dummyVolunteers} = require('./customSeedArrays/dummyVolunteers')
const {dummyOrganizations} = require('./customSeedArrays/dummyOrganizations')
//customOrganizationSeed Imports
const {
  organizationNames,
  missionStatements,
  organizationUrls,
  addresses,
  photoUrls
} = require('./customSeedArrays/customOrganizationSeed')

//customEventSeed Imports
const {
  titleArr,
  descriptionArr,
  addressArr,
  lat,
  long
} = require('./customSeedArrays/customEventSeed')

//seed for consistency
faker.seed(100)

const categories = [
  'animals',
  'youth',
  'agriculture',
  'environment',
  'art',
  'civic',
  'hunger',
  'education',
  'advocacy'
]

const chooseInterests = () => {
  const interests = []
  const randomNum = Math.floor(Math.random() * 6)
  for (let i = randomNum; i < randomNum + 2; i++) {
    interests.push(categories[i])
  }
  return interests
}

const createVolunteer = async () => {
  try {
    const pass = faker.internet.password()
    let currentVolunteer = await Volunteer.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      interests: chooseInterests(),
      profilePic: faker.image.avatar(),
      password: pass
    })
    return currentVolunteer
  } catch (error) {
    console.log(error)
  }
}

//neo4j
const neo4j = require('neo4j-driver').v1
var driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic('neo4j', 'teamRadish')
)
driver.onCompleted = () => {
  console.log('Driver created')
}
const session = driver.session()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  session.run('MATCH (n) DETACH DELETE n')

  const seededVolunteers = await Promise.all(
    dummyVolunteers.map(volunteer => Volunteer.create(volunteer))
  )

  const seededOrganizations = await Promise.all(
    dummyOrganizations.map(organization => Organization.create(organization))
  )
  // const seededEvents = await Promise.all(
  //   dummyEvents.map(event => Event.create(event))
  // )

  // let volun = seededVolunteers[0]
  // volun.addEvent(seededEvents)

  // let volun2 = seededVolunteers[1]
  // volun2.addEvent(seededEvents[1])

  // await VolunteerEvent.createHasAttended(1, 1)
  // await VolunteerEvent.createHasAttended(1, 2)
  // await VolunteerEvent.createHasAttended(1, 3)
  // await VolunteerEvent.createHasAttended(1, 4)
  // await VolunteerEvent.createHasAttended(1, 5)
  // await VolunteerEvent.createHasAttended(2, 2)

  const categoryArray = []

  for (let i = 0; i < categories.length; i++) {
    let category = await Category.create({
      name: categories[i]
    })
    categoryArray.push(category)
  }

  const organizationArray = []

  for (let i = 0; i < organizationNames.length; i++) {
    let organization = await Organization.create({
      name: organizationNames[i],
      contactFirstName: faker.name.firstName(),
      contactLastName: faker.name.lastName(),
      contactEmail: faker.internet.email(),
      contactPhone: faker.phone.phoneNumber(),
      missionStatement: missionStatements[i],
      webUrl: organizationUrls[i],
      orgImage: photoUrls[i],
      address: addresses[i],
      password: faker.internet.password()
    })
    organizationArray.push(organization)
    if (i < 7) {
      categoryArray[0].addOrganization(organization)
    } else {
      categoryArray[Math.ceil(Math.random() * 5)].addOrganization(organization)
    }
  }

  const futureEvents = []
  const pastEvents = []

  //Future Events
  for (let i = 0; i < 22; i++) {
    let event = await Event.create({
      title: titleArr[i],
      startTime: (datePtr = faker.date
        .future(0.02, this.createdAt)
        .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
      endTime: new Date(datePtr).setHours(
        hourNum + faker.random.number({min: 1, max: 3}),
        0,
        0,
        0
      ),
      address: addressArr[i],
      latitude: lat[i + 5],
      longitude: long[i + 5],
      description: descriptionArr[i],
      volunteerTargetNum: faker.random.number({min: 3, max: 25}),
      isActive: true
    })
    organizationArray[Math.floor(Math.random() * 52)].addEvent(event)
    futureEvents.push(event)
  }

  //Past Events
  for (let i = 0; i < 22; i++) {
    let event = await Event.create({
      title: titleArr[i],
      startTime: (datePtr = faker.date
        .past(0.04, this.createdAt)
        .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
      endTime: new Date(datePtr).setHours(
        hourNum + faker.random.number({min: 1, max: 3}),
        0,
        0,
        0
      ),
      address: addressArr[i],
      description: descriptionArr[i],
      latitude: lat[i + 5],
      longitude: long[i + 5],
      volunteerTargetNum: faker.random.number({min: 3, max: 25}),
      isActive: false
    })
    organizationArray[Math.floor(Math.random() * 52)].addEvent(event)
    pastEvents.push(event)
  }

  for (let i = 0; i < 200; i++) {
    let volunteer = await createVolunteer()
    if (i % 6 === 0) {
      volunteer.addEvent(pastEvents[Math.floor(Math.random() * 22)])
      volunteer.addEvent(futureEvents[Math.floor(Math.random() * 22)])
    }
  }

  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}
