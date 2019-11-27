import axios from 'axios'
import {ngrokSecret} from '../secrets'

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
    default:
      return state
  }
}
