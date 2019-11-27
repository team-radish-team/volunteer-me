import axios from 'axios'
import {ngrokSecret} from '../secrets'

<<<<<<< HEAD
//action types
const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION'
const UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION'

//action creators
export const createOrganization = organization => ({
  type: CREATE_ORGANIZATION,
  organization
})

export const updateOrganization = organization => ({
  type: UPDATE_ORGANIZATION,
  organization
})

//thunks

export const createOrganizationThunk = organization => async dispatch => {
  try {
    const {data} = await axios.post(
      `${ngrokSecret}/api/organizations`,
      organization
    )
    dispatch(createOrganization(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateOrganizationThunk = organization => async dispatch => {
  try {
    const {data} = await axios.put(`/api/organizations/${volunteer.id}`)
    dispatch(updateOrder(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer

const initialState = {
  currentOrganization: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORGANIZATION: {
      return {...state, currentOrganization: action.organization}
    }
    case UPDATE_ORGANIZATION: {
      return {...state, currentOrganization: action.organization}
    }
=======
const GET_ORGANIZATION = 'GET_ORGANIZATION'

const getOrganization = organization => ({type: GET_ORGANIZATION, organization})

const defaultState = []

export const me = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${ngrokSecret}/auth/me`)
      dispatch(getOrganization(res.data))
    } catch (err) {
      console.log(error)
    }
  }
}

export const auth = (email, password) => {
  return async dispatch => {
    let res
    try {
      res = await axios.post(`${ngrokSecret}/auth/`, {email, password})
    } catch (authError) {
      return dispatch(getOrganization({error: authError}))
    }
  }
}

export const getOrganizationThunk = organizationId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `${ngrokSecret}/api/organizations/${organizationId}`
      )
      dispatch(getOrganization(data))
    } catch (error) {
      console.error('Error getting organization', error)
    }
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ORGANIZATION:
      return action.organization
>>>>>>> 0580c828879001fe91586d833e8f3276b25154c4
    default:
      return state
  }
}
