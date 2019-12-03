const router = require('express').Router()
const {Volunteer} = require('../../db/models')
module.exports = router

/**
 *  GET all volunteers (api/volunteers)
 */
router.get('/', async (req, res, next) => {
  try {
    const volunteers = await Volunteer.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'interests',
        'profilePic'
      ]
    })
    res.json(volunteers)
  } catch (err) {
    next(err)
  }
})

/**
 *  GET single volunteer (api/volunteers/:id)
 */

router.get('/:volunteerId', async (req, res, next) => {
  try {
    console.log('req', req)
    let volunteer = await Volunteer.findByPk(Number(req.params.volunteerId))
    console.log('in the api', volunteer)
    res.json(volunteer)
  } catch (err) {
    next(err)
  }
})

// POST a single volunteer

router.post('/', async (req, res, next) => {
  try {
    let volunteer = await Volunteer.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      interests: req.body.interests ? req.body.interests : null,
      profilePic: req.body.profilePic ? req.body.profilePic : null
    })
    res.json(volunteer)
  } catch (err) {
    next(err)
  }
})

/**
 *  PUT single user (api/users/:id)
 */

// router.put('/:userId', async (req, res, next) => {
//   try {
//     let oldUser = await User.findById(req.params.userId)
//     await oldUser.update({
//       email: req.body.email,
//       password: req.body.password,
//       googleId: req.body.googleId
//     })
//   } catch (error) {
//     next(error)
//   }
// })

/**
 *  DELETE single user (api/users/:id)
 */

// router.delete('/:userId', isAdmin, async (req, res, next) => {
//   try {
//     await User.destroy({
//       where: {id: req.body.userId}
//     })
//     res.sendStatus(200)
//   } catch (error) {
//     next(error)
//   }
// })
