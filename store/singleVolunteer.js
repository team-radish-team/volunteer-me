import axios from 'axios'
import {ngrokSecret} from '../secrets'

//action types
const CREATE_VOLUNTEER = 'CREATE_VOLUNTEER'
const UPDATE_VOLUNTEER = 'UPDATE_VOLUNTEER'

//action creators
export const createVolunteer = volunteer => ({
  type: CREATE_VOLUNTEER,
  volunteer
})

export const updateVolunteer = volunteer => ({
  type: UPDATE_VOLUNTEER,
  volunteer
})

//thunks

export const createVolunteerThunk = volunteer => async dispatch => {
  try {
    const {data} = await axios.post(`${ngrokSecret}/api/volunteers`, volunteer)
    dispatch(createVolunteer(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateVolunteerThunk = volunteer => async dispatch => {
  try {
    const {data} = await axios.update(`/api/volunteers/${volunteer.id}`)
    dispatch(updateOrder(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer

const initialState = {
  currentVolunteer: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_VOLUNTEER: {
      return state
    }
    case UPDATE_VOLUNTEER: {
      return {...state, currentVolunteer: action.volunteer}
    }
    default:
      return state
  }
}
