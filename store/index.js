import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import allVolunteers from './allVolunteers'

const reducer = combineReducers({
  allVolunteers
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, middleware)

export default store
export * from './allVolunteers'
