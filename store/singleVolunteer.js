import axios from 'axios'
import {ngrokSecret} from '../secrets'

//action types
const CREATE_VOLUNTEER = 'CREATE_VOLUNTEER'
const UPDATE_VOLUNTEER = 'UPDATE_VOLUNTEER'
const GET_VOLUNTEER = 'GET_VOLUNTEER'
const REMOVE_VOLUNTEER = 'REMOVE_VOLUNTEER'

//action creators
export const createVolunteer = volunteer => ({
  type: CREATE_VOLUNTEER,
  volunteer
})

export const updateVolunteer = volunteer => ({
  type: UPDATE_VOLUNTEER,
  volunteer
})

const getVolunteer = volunteer => ({type: GET_VOLUNTEER, volunteer})

const removeVolunteer = () => ({type: REMOVE_VOLUNTEER})

//thunks

export const volunteer = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${ngrokSecret}/auth/volunteer/`)
      dispatch(getVolunteer(res.data || defaultVolunteer))
    } catch (err) {
      console.log(error)
    }
  }
}

export const auth = (email, password, type) => {
  return async dispatch => {
    let res
    try {
      res = await axios.post(`${ngrokSecret}/auth/volunteer/login`, {
        email,
        password,
        type
      })
    } catch (authError) {
      return dispatch(getVolunteer({error: authError}))
    }

    try {
      dispatch(getVolunteer(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createVolunteerThunk = volunteer => async dispatch => {
  try {
    const {data} = await axios.post(`${ngrokSecret}/api/volunteers`, volunteer)
    dispatch(createVolunteer(data))
    return data
  } catch (err) {
    console.error(err)
  }
}

export const updateVolunteerThunk = (
  volunteer,
  volunteerId
) => async dispatch => {
  try {

    const {data} = await axios.patch(
      `${ngrokSecret}/api/volunteers/${volunteerId}`,
      volunteer
    )
    dispatch(updateVolunteer(data))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      await axios.post(`${ngrokSecret}/auth/logout`)
      dispatch(removeVolunteer())
    } catch (err) {
      console.error(err)
    }
  }
}

export const getVolunteerThunk = volunteerId => {
  return async dispatch => {
    try {
      if (volunteerId) {
        const {data} = await axios.get(
          `${ngrokSecret}/api/volunteers/${volunteerId}`
        )
        dispatch(getVolunteer(data))
      }

    } catch (error) {
      console.error('Error getting volunteer', error)
    }
  }
}

//reducer

const initialState = {signedUpVol: {}, emailExists: {}}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VOLUNTEER:
      return action.volunteer
    case REMOVE_VOLUNTEER:
      return state
    case CREATE_VOLUNTEER: {
      return {state, signedUpVol: action.volunteer}
    }
    case UPDATE_VOLUNTEER: {
      return {state, signedUpVol: action.volunteer}
    }
    default:
      return state
  }
}
