const router = require('express').Router()
const {Organization} = require('../../db/models')
module.exports = router

//GET all organizations
router.get('/', async (req, res, next) => {
  try {
    let allOrganizations = await Organization.findAll()
    res.json(allOrganizations).status(200)
  } catch (error) {
    next(error)
  }
})

// POST a single organization

router.post('/', async (req, res, next) => {
  try {
    let org = await Organization.create({
      name: req.body.name,
      address: req.body.address,
      missionStatement: req.body.missionStatement,
      webUrl: req.body.webUrl,
      contactFirstName: req.body.contactFirstName,
      contactLastName: req.body.contactLastName,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      password: req.body.password
    })
    res.json(org)
  } catch (err) {
    next(err)
  }
})
