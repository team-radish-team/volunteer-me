import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createAppContainer} from 'react-navigation'
import {EntireApp} from '../navigation/navigators'
import {getEventsThunk, expiredEventThunk} from '../store/allEvents'

const AppContainer = createAppContainer(EntireApp)

export default function TimeMiddleware(props) {
  const dispatch = useDispatch()
  const events = useSelector(state => state.allEvents.allEvents)

  //checks hourly for events that should be inactive
  const [time, setTime] = useState(new Date().getTime())
  useEffect(() => {
    const interval = setTimeout(() => {
      const now = new Date()
      setTime(now.getTime())
      dispatch(getEventsThunk())
    }, 3610000)
  }, [time])

  //checks on mounting for events that should be inactive
  useEffect(() => {
    dispatch(getEventsThunk())
  }, [])

  events.forEach(event => {
    if (event.isActive && Date.parse(event.endTime) <= time) {
      dispatch(expiredEventThunk(event.id))
    }
  })

  //renders rest of the app
  return <AppContainer />
}
