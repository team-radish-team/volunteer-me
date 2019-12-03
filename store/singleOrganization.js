import axios from 'axios'
import {ngrokSecret} from '../secrets'

//action types
const GET_ORGANIZATION = 'GET_ORGANIZATION'
const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION'
const UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION'
const REMOVE_ORGANIZATION = 'REMOVE_ORGANIZATION'

//action creators
export const getOrganization = organization => ({
  type: GET_ORGANIZATION,
  organization
})

export const removeOrganization = () => ({type: REMOVE_ORGANIZATION})

export const createOrganization = organization => ({
  type: CREATE_ORGANIZATION,
  organization
})

export const updateOrganization = organization => ({
  type: UPDATE_ORGANIZATION,
  organization
})

//thunks
export const organization = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${ngrokSecret}/auth/organization`)
      dispatch(getOrganization(res.data || defaultOrganization))
    } catch (err) {
      console.log(error)
    }
  }
}

export const auth = (email, password, type) => {
  return async dispatch => {
    let res
    try {
      res = await axios.post(`${ngrokSecret}/auth/organization/login`, {
        email,
        password,
        type
      })
    } catch (authError) {
      return dispatch(getOrganization({error: authError}))
    }

    try {
      dispatch(getOrganization(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      await axios.post(`${ngrokSecret}/auth/logout`)
      dispatch(removeOrganization())
    } catch (err) {
      console.error(err)
    }
  }
}

export const getOrganizationThunk = organizationId => {
  return async dispatch => {
    try {
      if (organizationId) {
        const {data} = await axios.get(
          `${ngrokSecret}/api/organizations/${organizationId}`
        )
        dispatch(getOrganization(data))
      }
    } catch (error) {
      console.error('Error getting organization', error)
    }
  }
}

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
    const {data} = await axios.put(
      `${ngrokSecret}/api/organizations/${organization.id}`
    )
    dispatch(updateOrder(data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

export default function singleOrganization(state = initialState, action) {
  switch (action.type) {
    case GET_ORGANIZATION:
      return action.organization
    case CREATE_ORGANIZATION:
      return action.organization
    case UPDATE_ORGANIZATION:
      return action.organization
    case REMOVE_ORGANIZATION:
      return state
    default:
      return state
  }
}
