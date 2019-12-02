import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import allVolunteers from './allVolunteers'
import allEvents from './allEvents'
import singleVolunteer from './singleVolunteer'
import singleOrganization from './singleOrganization'

const reducer = combineReducers({
  allVolunteers,
  allEvents,
  singleVolunteer,
  singleOrganization
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, middleware)

export default store
// export * from './allVolunteers'
// export * from './allEvents'
// export * from './singleVolunteer'
// // export * from './singleOrganization'
