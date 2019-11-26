import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk} from '../store/allEvents'
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base'
import EventCard from './EventCard'

const EventList = props => {
  const dispatch = useDispatch()
  const events = useSelector(state => state.allEvents)
  useEffect(() => {
    dispatch(getEventsThunk())
  }, [])
  return (
    <React.Fragment>
      <Content>
        {events.map(event => {
          return (
            <EventCard
              key={event.id}
              event={event}
              navigation={props.navigation}
            />
          )
        })}
      </Content>
    </React.Fragment>
  )
}

export default EventList
