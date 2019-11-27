const faker = require('faker')

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

module.exports = {dummyEvents}
