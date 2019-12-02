import axios from 'axios'
import {ngrokSecret} from '../secrets'

const GET_ALL_EVENTS = 'GET_ALL_EVENTS'

const getEvents = events => ({type: GET_ALL_EVENTS, events})

const defaultState = []

export const getEventsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get(`${ngrokSecret}/api/events`)
    dispatch(getEvents(data))
  } catch (error) {
    console.error('Error getting all events', error)
  }
}

export const getOrgEventsThunk = organizationId => async dispatch => {
  try {
    if (organizationId) {
      const {data} = await axios.get(
        `${ngrokSecret}/api/events/${organizationId}`
      )
      dispatch(getEvents(data))
    }
  } catch (error) {
    console.error('Error getting all events', error)
  }
}

//import {v1 as neo4j} from 'neo4j-driver'
// var driver = neo4j.driver(
//   'bolt://localhost',
//   neo4j.auth.basic('neo4j', 'teamRadish')
// )
// driver.onCompleted = () => {
//   console.log('Driver created')
// }
// const session = driver.session()

export const getNeo4jEventsThunk = (volunteerId, eventId) => async dispatch => {
  try {
    const {data} = await axios.get(
      `${ngrokSecret}/api/events/neo4j/${volunteerId}/${eventId}`
    )
    console.log(data)
    dispatch(getEvents(data))
  } catch (error) {
    console.error('Error getting neo4j events ', error)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return action.events
    default:
      return state
  }
}
