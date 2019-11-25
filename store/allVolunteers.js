import axios from 'axios'

const GET_ALL_VOLUNTEERS = 'GET_ALL_VOLUNTEERS'

const getVolunteers = volunteers => ({type: GET_ALL_VOLUNTEERS, volunteers})

const defaultState = []

export const getVolunteersThunk = () => async dispatch => {
  try {
    console.log('in thunk')
    console.log('key is', process.env.REACT_APP_NGROK_KEY)
    const {data} = await axios.get(`${process.env.NGROK_KEY}/api/volunteers`)
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
