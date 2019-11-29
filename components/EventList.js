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
  const handleHeaderChange = event => {
    console.log('hello')
  }
  const handleFilterChange = event => {
    console.log('filter')
  }

  const dispatch = useDispatch()
  const events = useSelector(state => state.allEvents)
  useEffect(() => {
    dispatch(getEventsThunk())
    props.navigation.setParams({handleHeaderChange, handleFilterChange})
  }, [])
  const [header, setHeader] = useState('Events Near You')
  const [filter, setFilter] = useState('')
  return (
    <React.Fragment>
      {/* <Content>
        {header === 'Events Near You' ? (
          <Text>Events</Text>
        ) : ( */}
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

const eventHeaderOptions = ['Events Near You', 'Recommended Events']

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
        defaultValue={'Categories'}
        onSelect={navigation.getParam('handleFilterChange')}
        options={[
          'Animals',
          'Youth',
          'Agriculture',
          'Environment',
          'Art and Music',
          'Civic Engagement',
          'Hunger',
          'Education',
          'Advocacy'
        ]}
        textStyle={{fontSize: 15, marginRight: 15, color: 'black'}}
      />
    )
  }
}

export default EventList
