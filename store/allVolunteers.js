import axios from 'axios'

const GET_ALL_VOLUNTEERS

const getVolunteers = volunteers => ({type: GET_ALL_VOLUNTEERS, volunteers})

export const getVolunteersThunk = () => async dispatch => {
    try {
        
    } catch (error) {
        console.error('Error getting all volunteers', error)
    }
}
