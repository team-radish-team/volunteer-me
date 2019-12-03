import React, {useEffect, useState} from 'react'
import {StyleSheet, Dimensions, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk, getNeo4jEventsThunk} from '../store/allEvents'
import ModalDropdown from 'react-native-modal-dropdown'
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
  const handleHeaderChange = value => {
    setHeader(value)
  }
  const handleFilterChange = value => {
    setFilter(value)
  }

  const dispatch = useDispatch()
  const events = useSelector(state => state.allEvents.allEvents)
  const neoEvents = useSelector(state => state.allEvents.neoEvents)

  useEffect(() => {
    dispatch(getEventsThunk())
    dispatch(getNeo4jEventsThunk(45, 35))
    props.navigation.setParams({handleHeaderChange, handleFilterChange})
  }, [])
  const [filter, setFilter] = useState('All')
  return (
    <React.Fragment>
      <Content>
        {filter === 'All' || Number(filter) === 10
          ? events.map(event => {
              if (
                event.isActive &&
                event.volunteerCount < event.volunteerTargetNum
              ) {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    navigation={props.navigation}
                  />
                )
              }
            })
          : Number(filter) === 0
          ? neoEvents.map(neoEvent => {
              let neoId = neoEvent.low
              return (
                <EventCard
                  key={neoId}
                  event={events[neoId - 1]}
                  navigation={props.navigation}
                />
              )
            })
          : events.map(event => {
              if (Number(event.organization.categoryId) === Number(filter)) {
                if (
                  event.isActive &&
                  event.volunteerCount < event.volunteerTargetNum
                ) {
                  return (
                    <EventCard
                      key={event.id}
                      event={event}
                      navigation={props.navigation}
                    />
                  )
                }
              }
            })}
      </Content>
    </React.Fragment>
  )
}

const filterOptions = [
  'For You',
  'Animals',
  'Youth',
  'Agriculture',
  'Environment',
  'Art and Music',
  'Civic Engagement',
  'Hunger',
  'Education',
  'Advocacy',
  'All'
]

EventList.navigationOptions = ({navigation}) => {
  return {
    title: 'Events',
    headerRight: (
      <ModalDropdown
        defaultValue={'All'}
        onSelect={navigation.getParam('handleFilterChange')}
        options={filterOptions}
        textStyle={{fontSize: 15, marginRight: 15, color: 'black'}}
      />
    )
  }
}

export default EventList
