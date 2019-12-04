import axios from 'axios'
import {ngrokSecret} from '../secrets'

const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const GET_NEO_EVENTS = 'GET_NEO_EVENTS'
const GET_VOLUNTEER_EVENTS = 'GET_VOLUNTEER_EVENTS'

const addEvent = event => ({type: ADD_EVENT, event})
const getEvents = events => ({type: GET_ALL_EVENTS, events})
const getNeoEvents = eventIds => ({type: GET_NEO_EVENTS, eventIds})
const getVolunteerEvents = events => ({type: GET_VOLUNTEER_EVENTS, events})

const defaultState = {
  allEvents: [],
  neoEvents: [],
  volunteerEvents: []
}

export const getVolunteerEventsThunk = volunteerId => async dispatch => {
  try {
    const {data} = await axios.get(
      `${ngrokSecret}/api/events/volunteer/${volunteerId}`
    )
    dispatch(getVolunteerEvents(data.events))
  } catch (error) {
    console.error('Error getting volunteer events', error)
  }
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

export const addEventThunk = (
  eventName,
  description,
  volunteersNeeded,
  address,
  eventStart,
  eventEnd,
  dateOfEvent,
  organizationId
) => async dispatch => {
  try {
    const {data} = await axios.post(`${ngrokSecret}/api/events`, {
      eventName,
      description,
      volunteersNeeded,
      address,
      eventStart,
      eventEnd,
      dateOfEvent,
      organizationId
    })
    data.organizationId = organizationId
    dispatch(addEvent(data))
  } catch (error) {
    console.log('Error adding event', error)
  }
}

export const getNeo4jEventsThunk = (volunteerId, eventId) => async dispatch => {
  try {
    if (!eventId) {
      return undefined
    }
    const {data} = await axios.get(
      `${ngrokSecret}/api/events/neo4j/${volunteerId}/${eventId}`
    )
    console.log(data.records[0]._fields[0])
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

export const addVolunteerThunk = eventId => async dispatch => {
  try {
    const {data} = await axios.patch(`${ngrokSecret}/api/events/${eventId}`)
    dispatch(getEvents(data))
  } catch (error) {
    console.error('Error adding Volunteer', error)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {...state, allEvents: action.events}
    case GET_NEO_EVENTS:
      return {...state, neoEvents: action.eventIds}
    case GET_VOLUNTEER_EVENTS:
      return {...state, volunteerEvents: action.events}
    case ADD_EVENT:
      return {...state, allEvents: [...state.allEvents, action.event]}
    default:
      return state
  }
}
