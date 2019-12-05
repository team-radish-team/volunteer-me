import React, {useEffect, useState} from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  getEventsThunk,
  getNeo4jEventsThunk,
  getVolunteerEventsThunk
} from '../store/allEvents'
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
  Right,
  Title
} from 'native-base'
import EventCard from './EventCard'
import EventPage from './EventPage'
import VolLogoutButton from './VolLogoutButton'
import {getVolunteerThunk} from '../store/singleVolunteer'

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
  const volunteer = useSelector(state => state.singleVolunteer)
  const volEvents = useSelector(state => state.allEvents.volunteerEvents)
  //console.log(volunteer)
  //console.log('volEvents: ', volEvents)
  //console.log('VOL EVENTS', volEvents)
  useEffect(() => {
    dispatch(getEventsThunk())
    props.navigation.setParams({handleHeaderChange, handleFilterChange})
  }, [])
  useEffect(() => {
    dispatch(getVolunteerEventsThunk(volunteer.id))
  }, [volunteer.id])

  useEffect(() => {
    dispatch(getNeo4jEventsThunk(volunteer.id, volEvents))
  }, [volEvents.length])

  const [filter, setFilter] = useState('All')

  //console.log('volEvent length ', volEvents.length)

  return (
    <React.Fragment>
      <Content>
        {filter === 'All' || Number(filter) === 10 ? (
          events.map(event => {
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
        ) : Number(filter) === 0 ? (
          !neoEvents.length ? (
            <Container style={{justifyContent: 'center'}}>
              <Title>
                <Text>Attend an event for recommendations!</Text>
              </Title>
              <Image
                style={{width: 300, height: 300, marginLeft: 50}}
                source={{
                  uri: 'http://clipart-library.com/image_gallery/345750.png'
                }}
              />
            </Container>
          ) : (
            neoEvents.map(neoEvent => {
              let neoId = neoEvent.low
              return (
                <EventCard
                  key={neoId}
                  event={events[neoId - 1]}
                  navigation={props.navigation}
                />
              )
            })
          )
        ) : (
          events.map(event => {
            if (Number(event.organization.categoryId) === Number(filter)) {
              if (
                event.isActive &&
                event.volunteers.length < event.volunteerTargetNum
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
          })
        )}
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
