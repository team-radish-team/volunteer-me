import axios from 'axios'
import {ngrokSecret} from '../secrets'

const GET_EVENT = 'GET_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'
const REMOVE_EVENT = 'REMOVE_EVENT'

export const getEvent = event => ({
  type: GET_EVENT,
  event
})
export const updateEvent = event => ({type: UPDATE_EVENT, event})

export const getEventThunk = eventId => {
  return async dispatch => {
    try {
      if (eventId) {
        const {data} = await axios.get(`${ngrokSecret}/api/events/${eventId}`)
        dispatch(getOrganization(data))
      }
    } catch (error) {
      console.error('Error getting event', error)
    }
  }
}

export const updateEventThunk = (event, eventId) => async dispatch => {
  try {
    const {data} = await axios.patch(
      `${ngrokSecret}/api/events/${eventId}`,
      event
    )
    dispatch(updateEvent(data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

export default function singleEvent(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.event
    case UPDATE_EVENT:
      return action.event
    case REMOVE_EVENT:
      return initialState
    default:
      return state
  }
}
