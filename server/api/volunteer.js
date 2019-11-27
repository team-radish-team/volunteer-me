const router = require('express').Router()
const {Volunteer} = require('../../db/models')
module.exports = router

/**
 *  GET all volunteers (api/volunteers)
 */
router.get('/', async (req, res, next) => {
  try {
    let allVolunteers = await Volunteer.findAll()
    res.json(allVolunteers).status(200)
  } catch (error) {
    next(error)
  }
})

/**
 *  GET single volunteer (api/volunteers/:id)
 */

router.get('/:volunteerId', async (req, res, next) => {
  try {
    console.log(req.session)
    let user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST a single volunteer

router.post('/', async (req, res, next) => {
  try {
    let user = await User.create({
      firstName: 'Kate',
      lastName: 'Murray',
      email: 'kate@kate.com',
      phone: '617-680-7809',
      profilePic: 'wwww.robothash.org/kate',
      password: 'thingthingthing'
    })
    console.log('in API', user)
    res.json(user)
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
