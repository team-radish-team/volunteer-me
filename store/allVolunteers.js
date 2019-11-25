import axios from 'axios'

const GET_ALL_VOLUNTEERS = 'GET_ALL_VOLUNTEERS'

const getVolunteers = volunteers => ({type: GET_ALL_VOLUNTEERS, volunteers})

const defaultState = []

export const getVolunteersThunk = () => async dispatch => {
  try {
    console.log('in thunk')
    const {data} = await axios.get('/api/volunteers')
    dispatch(getVolunteers(data))
  } catch (error) {
    console.error('Error getting all volunteers', error)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_VOLUNTEERS:
      return action.volunteers
    default:
      return state
  }
}
