const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const {db} = require('../db')
const app = express()
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
module.exports = app

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (req, id, done) => {
  try {
    console.log('id', id)
    if (req.body.type === 'volunteer') {
      const user = await db.models.volunteer.findByPk(id.id)
      done(null, user)
    } else {
      const user = await db.models.organization.findByPk(id.id)
      done(null, user)
    }
  } catch (error) {
    done(error)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // passport middleware

  app.use(
    session({
      secret: 'whocares',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  //app.use('/auth', require('./auth'))
  app.use(`/api`, require('./api'))
  app.use('/auth', require('./auth'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(8080, () =>
    console.log(`Mixing it up on port 8080`)
  )
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

bootApp()
