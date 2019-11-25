const db = require('../db/db')
const faker = require('faker')
const {
  Category,
  Event,
  Organization,
  Volunteer,
  VolunteerEvent
} = require('../db/index')

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

const dummyEvents = [
  {
    title: 'Wag upon a Time',
    startTime: (datePtr = faker.date
      .future(0.02, this.createdAt)
      .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
    endTime: new Date(datePtr).setHours(
      hourNum + faker.random.number({min: 1, max: 3}),
      0,
      0,
      0
    ),
    address: '1501 E 83rd Pl',
    description: 'Come adopt some rescue dogs!',
    volunteerTargetNum: faker.random.number({min: 3, max: 25})
  },
  {
    title: 'Voting Literacy 5K',
    startTime: (datePtr = faker.date
      .future(0.02, this.createdAt)
      .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
    endTime: new Date(datePtr).setHours(
      hourNum + faker.random.number({min: 1, max: 3}),
      0,
      0,
      0
    ),
    address: '1434 N Parkside Ave',
    description:
      'Encourage youths to vote by educating them on their options in this 5K.',
    volunteerTargetNum: faker.random.number({min: 3, max: 25})
  },
  {
    title: 'Dashing Cats with Whiskers',
    startTime: (datePtr = faker.date
      .future(0.02, this.createdAt)
      .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
    endTime: new Date(datePtr).setHours(
      hourNum + faker.random.number({min: 1, max: 3}),
      0,
      0,
      0
    ),
    address: '1839 N Richmond St',
    description:
      'Whiskers is an organization that helps families of cats stay together with fosters willing to accomodate groups of cats.',
    volunteerTargetNum: faker.random.number({min: 3, max: 25})
  },
  {
    title: 'Kids and Kits',
    startTime: (datePtr = faker.date
      .future(0.02, this.createdAt)
      .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
    endTime: new Date(datePtr).setHours(
      hourNum + faker.random.number({min: 1, max: 3}),
      0,
      0,
      0
    ),
    address: '9535 S Loomis St',
    description:
      'Come join for free kitten socialization with kids to encourage families expecting to socialize their kittens to play with their future human siblings.',
    volunteerTargetNum: faker.random.number({min: 3, max: 25})
  },
  {
    title: 'Tying Your Shoes',
    startTime: (datePtr = faker.date
      .future(0.02, this.createdAt)
      .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
    endTime: new Date(datePtr).setHours(
      hourNum + faker.random.number({min: 1, max: 3}),
      0,
      0,
      0
    ),
    address: '1119 E 46th St',
    description:
      "Come to the local library as we read popular children's book Tying your Shoes and teach best methods to teach everyday tasks to children with learning disabilities.",
    volunteerTargetNum: faker.random.number({min: 3, max: 25})
  }
]

// const testSeed = async () => {
//   try {
//     await db.sync({force: true})
//     const seededVolunteers = await Promise.all(
//       dummyVolunteers.map(volunteer => Volunteer.create(volunteer))
//     )
//     const seededEvents = await Promise.all(
//       dummyEvents.map(event => Event.create(event))
//     )
//     let volun = seededVolunteers[0]
//     volun.addEvent(seededEvents[0])
//   } catch (error) {
//     console.log(error)
//   }
// }

// testSeed()

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

  const seededVolunteers = await Promise.all(
    dummyVolunteers.map(volunteer => Volunteer.create(volunteer))
  )
  const seededEvents = await Promise.all(
    dummyEvents.map(event => Event.create(event))
  )

  let volun = seededVolunteers[0]
  volun.addEvent(seededEvents)

  let volun2 = seededVolunteers[1]
  volun2.addEvent(seededEvents[1])

  // await VolunteerEvent.createHasAttended(1, 1)
  // await VolunteerEvent.createHasAttended(1, 2)
  // await VolunteerEvent.createHasAttended(1, 3)
  // await VolunteerEvent.createHasAttended(1, 4)
  // await VolunteerEvent.createHasAttended(1, 5)
  // await VolunteerEvent.createHasAttended(2, 2)

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
