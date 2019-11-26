import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import allVolunteers from './allVolunteers'
import allEvents from './allEvents'

const reducer = combineReducers({
  allVolunteers,
  allEvents
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, middleware)

export default store
export * from './allVolunteers'
