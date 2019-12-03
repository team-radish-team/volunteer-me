import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createAppContainer} from 'react-navigation'
import {EntireApp} from '../navigation/navigators'
import {getEventsThunk} from '../store/allEvents'

const AppContainer = createAppContainer(EntireApp)

export default function TimeMiddleware(props) {
  const [time, setTime] = useState(new Date().getTime())
  useEffect(() => {
    const interval = setTimeout(() => {
      const now = new Date()
      setTime(now.getTime() / 1000)
    }, 10000)
  }, [time])

  const events = useSelector(state => state.allEvents.allEvents)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEventsThunk())
  }, [])

  events.forEach(event => {
    //console.log(Date.parse(event.endTime))
    if (event.isActive && Date.parse(event.endTime) <= time) {
      //console.log('Expired: ', event.endTime)
    }
  })

  console.log('time', time)
  return <AppContainer />
}
