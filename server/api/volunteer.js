const router = require('express').Router()
const {Volunteer} = require('../../db/models')
module.exports = router

//GET all volunteers
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

//GET a single volunteer
router.get('/:volunteerId', async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.volunteerId)
    res.json(volunteer)
  } catch (err) {
    next(err)
  }
})

// POST a single volunteer
router.post('/', async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findAll({
      where: {
        email: req.body.email
      }
    })

    if (volunteer.length > 0) {
      res.json('exists')
    } else {
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
    }
  } catch (err) {
    next(err)
  }
})

//PUT a single volunteer
router.put('/:volunteerId', async (req, res, next) => {
  try {
    let oldVol = await Volunteer.findByPk(req.params.volunteerId)
    let updated = await oldVol.update({
      interests: req.body.interests
    })
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

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

/**
 *  PATCH promote single user (api/users/:id)
 */

// router.patch('/:userId', isAdmin, async (req, res, next) => {
//   try {
//     await User.update(
//       {
//         isAdmin: true
//       },
//       {where: {id: req.body.userId}}
//     )
//     res.sendStatus(200)
//   } catch (error) {
//     next(error)
//   }
// })
