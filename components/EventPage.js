import React, {useEffect, useState} from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {addVolunteerThunk, getEventVolunteersThunk} from '../store/allEvents'
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
import normalize from '../utilities/timeConverter'
import VolunteerCard from '../components/VolunteerCard'
const EventPage = props => {
  const event = props.navigation.state.params
  const dispatch = useDispatch()
  const volunteers = useSelector(state => state.allEvents.volunteers)
  const volunteer = useSelector(state => state.singleVolunteer)

  useEffect(() => {
    dispatch(getEventVolunteersThunk(event.id))
  }, [])

  if (!volunteers) {
    return <React.Fragment></React.Fragment>
  } else {
    return (
      <React.Fragment>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Image
                source={{
                  uri: `${event.organization.orgImage}`
                }}
                style={{flex: 1, width: null, height: 400}}
              />
            </CardItem>
            <CardItem>
              <Text style={{fontFamily: 'Roboto'}}>
                {event.organization.name}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={{fontFamily: 'Roboto'}}>
                Volunteers Needed: {volunteers.length}/
                {event.volunteerTargetNum}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={{fontFamily: 'Roboto'}}>
                {event.startTime.slice(5, 10)} from{' '}
                {normalize(event.startTime.slice(11, 16))} -{' '}
                {normalize(event.endTime.slice(11, 16))}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={{fontFamily: 'Roboto'}}>{event.address}</Text>
            </CardItem>
            <CardItem>
              <Text style={{fontFamily: 'Roboto'}}>{event.description}</Text>
            </CardItem>
            <CardItem>
              {volunteers.find(vol => vol.id === volunteer.id) ? (
                <Button
                  disabled
                  style={{
                    width: 195,
                    marginLeft: 95,
                    marginTop: 10,
                    marginBottom: 20
                  }}
                >
                  <Text style={{fontFamily: 'Roboto'}}>
                    Have fun at this event!
                  </Text>
                </Button>
              ) : (
                <Button
                  style={{
                    width: 175,
                    marginLeft: 120,
                    marginTop: 10,
                    marginBottom: 20
                  }}
                  rounded
                  iconLeft
                  onPress={() => {
                    dispatch(addVolunteerThunk(event.id, volunteer.id))
                    props.navigation.goBack()
                  }}
                >
                  <Icon name="people" />
                  <Text style={{fontFamily: 'Roboto'}}>I'm Attending!</Text>
                </Button>
              )}
            </CardItem>
          </Card>
          <Text
            style={{
              marginTop: 30,
              marginBottom: 20,
              textAlign: 'center',
              fontFamily: 'Roboto'
            }}
          >
            Who's helping out?
          </Text>
          {volunteers.map(volunteer => {
            return <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          })}
        </Content>
      </React.Fragment>
    )
  }
}
EventPage.navigationOptions = ({navigation}) => {
  return {
    title: navigation.state.params.title
  }
}
export default EventPage
