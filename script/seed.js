const db = require('../db/db')
const faker = require('faker')
const {Category, Event, Organization, Volunteer} = require('../db/index')
const {
  organizationNames,
  missionStatements,
  organizationUrls,
  addresses,
  photoUrls
} = require('./customSeedArrays/customOrganizationSeed')

const {
  titleArr,
  descriptionArr,
  addressArr
} = require('./customSeedArrays/customEventSeed')

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

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < categories.length; i++) {
    await Category.create({
      name: categories[i]
    })
  }

  //Future Events
  for (let i = 0; i < 22; i++) {
    await Event.create({
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
      description: descriptionArr[i],
      volunteerTargetNum: faker.random.number({min: 3, max: 25})
    })
  }

  //Past Events
  for (let i = 0; i < 22; i++) {
    await Event.create({
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
      volunteerTargetNum: faker.random.number({min: 3, max: 25})
    })
  }

  for (let i = 0; i < organizationNames.length; i++) {
    await Organization.create({
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
  }

  for (let i = 0; i < 200; i++) {
    await createVolunteer()
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
