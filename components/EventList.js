import React, {useEffect, useState} from 'react'
import {StyleSheet, Dimensions, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk} from '../store/allEvents'
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
  const events = useSelector(state => state.allEvents)
  useEffect(() => {
    dispatch(getEventsThunk())
    props.navigation.setParams({handleHeaderChange, handleFilterChange})
  }, [])
  const [header, setHeader] = useState('Events Near You')
  const [filter, setFilter] = useState('All')

  return (
    <React.Fragment>
      <Content>
        {filter === 'All' || Number(filter) === 0
          ? events.map(event => {
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  navigation={props.navigation}
                />
              )
            })
          : events.map(event => {
              if (Number(event.organization.categoryId) === Number(filter)) {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    navigation={props.navigation}
                  />
                )
              }
            })}
      </Content>
    </React.Fragment>
  )
}

const eventHeaderOptions = ['Events Near You', 'Recommended Events']
const filterOptions = [
  'All',
  'Animals',
  'Youth',
  'Agriculture',
  'Environment',
  'Art and Music',
  'Civic Engagement',
  'Hunger',
  'Education',
  'Advocacy'
]

EventList.navigationOptions = ({navigation}) => {
  return {
    headerTitle: (
      <ModalDropdown
        options={eventHeaderOptions}
        defaultValue={'Events Near You'}
        onSelect={navigation.getParam('handleHeaderChange')}
        dropdownStyle={{
          alignItems: 'center',
          height: 40 * eventHeaderOptions.length
        }}
        dropdownTextStyle={{fontSize: 16, color: 'black'}}
        textStyle={{fontSize: 20, color: 'black'}}
      />
    ),
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
