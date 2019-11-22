const db = require('../db')
const faker = require('faker')
const {Category, Event, Organization, Volunteer} = require('../db/index')

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
