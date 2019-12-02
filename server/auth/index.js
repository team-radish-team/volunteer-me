const router = require('express').Router()
const {Organization, Volunteer} = require('../../db/index')
module.exports = router

router.post('/organization/login', async (req, res, next) => {
  try {
    const organization = await Organization.findOne({
      where: {contactEmail: req.body.email}
    })
    if (!organization) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!organization.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(organization, err => (err ? next(err) : res.json(organization)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/volunteer/login', async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findOne({
      where: {email: req.body.email}
    })
    if (!volunteer) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!volunteer.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(volunteer, err => (err ? next(err) : res.json(volunteer)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/organization/signup', async (req, res, next) => {
  try {
    const organization = await Organization.create(req.body)
    req.login(organization, err => (err ? next(err) : res.json(organization)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Organization already exists')
    } else {
      next(err)
    }
  }
})

router.post('/volunteer/signup', async (req, res, next) => {
  try {
    const volunteer = await Volunteer.create(req.body)
    req.login(volunteer, err => (err ? next(err) : res.json(volunteer)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Volunteer already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/volunteer', (req, res) => {
  res.json(req.volunteer)
})

router.get('/organization', (req, res) => {
  res.json(req.organization)
})
