import axios from 'axios'
import {ngrokSecret} from '../secrets'

const GET_ORGANIZATION = 'GET_ORGANIZATION'
const REMOVE_ORGANIZATION = 'REMOVE_ORGANIZATION'

const getOrganization = organization => ({type: GET_ORGANIZATION, organization})
const removeOrganization = () => ({type: REMOVE_ORGANIZATION})

const defaultOrganization = {}

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

export const auth = (email, password) => {
  return async dispatch => {
    let res
    try {
      res = await axios.post(`${ngrokSecret}/auth/`, {email, password})
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
      const {data} = await axios.get(
        `${ngrokSecret}/api/organizations/${organizationId}`
      )
      dispatch(getOrganization(data))
    } catch (error) {
      console.error('Error getting organization', error)
    }
  }
}

export default function(state = defaultOrganization, action) {
  switch (action.type) {
    case GET_ORGANIZATION:
      return action.organization
    case REMOVE_ORGANIZATION:
      return defaultOrganization
    default:
      return state
  }
}
