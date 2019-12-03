import axios from 'axios'
import {ngrokSecret} from '../secrets'

const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
const ADD_EVENT = 'ADD_EVENT'

const addEvent = event => ({type: ADD_EVENT, event})
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

export const addEventThunk = (
  eventName,
  description,
  volunteersNeeded,
  address,
  eventStart,
  eventEnd,
  dateOfEvent
) => async dispatch => {
  try {
    const {data} = await axios.post(`${ngrokSecret}/api/events`, {
      eventName,
      description,
      volunteersNeeded,
      address,
      eventStart,
      eventEnd,
      dateOfEvent
    })
  } catch (error) {
    console.log('Error adding event', error)
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
