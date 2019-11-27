import axios from 'axios'
import {ngrokSecret} from '../secrets'

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
    default:
      return state
  }
}
