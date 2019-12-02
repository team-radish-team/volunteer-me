const router = require('express').Router()
const {Organization} = require('../../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const organizations = await Organization.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'contactEmail',
        'name',
        'missionStatement',
        'webUrl',
        'orgImage',
        'address'
      ]
    })
    res.json(organizations)
  } catch (err) {
    next(err)
  }
})

router.get('/:organizationId', async (req, res, next) => {
  try {
    const organization = await Organization.findByPk(
      Number(req.params.organizationId)
    )
    res.status(200).json(organization)
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
