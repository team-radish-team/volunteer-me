import axios from 'axios'
import {ngrokSecret} from '../secrets'

const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
const GET_NEO_EVENTS = 'GET_NEO_EVENTS'

const getEvents = events => ({type: GET_ALL_EVENTS, events})
const getNeoEvents = eventIds => ({type: GET_NEO_EVENTS, eventIds})

const defaultState = {
  allEvents: [],
  neoEvents: []
}

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

export const getNeo4jEventsThunk = (volunteerId, eventId) => async dispatch => {
  try {
    const {data} = await axios.get(
      `${ngrokSecret}/api/events/neo4j/${volunteerId}/${eventId}`
    )
    //console.log(data.records[0]._fields[0])
    dispatch(getNeoEvents(data.records[0]._fields[0]))
  } catch (error) {
    console.error('Error getting neo4j events ', error)
  }
}

export const expiredEventThunk = eventId => async dispatch => {
  try {
    await axios.put(`${ngrokSecret}/api/events/time/${eventId}`)
  } catch (error) {
    console.error('Error occured while trying to make event inactive')
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {...state, allEvents: action.events}
    case GET_NEO_EVENTS:
      return {...state, neoEvents: action.eventIds}
    default:
      return state
  }
}
