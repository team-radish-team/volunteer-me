import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk} from '../store/allEvents'
import {getEventThunk} from '../store/singleEvent'
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
import {withNavigation} from 'react-navigation'

import normalize from '../utilities/timeConverter'

const OrgEventPage = props => {
  const event = props.navigation.state.params
  const currentEvent = useSelector(state => state.singleEvent)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEventThunk(currentEvent.id))
  }, [currentEvent.id])

  handleClick = () => {
    props.navigation.navigate('EventEditForm', {
      event: currentEvent,
      orgEvent: event
    })
  }

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
            <Text>{event.organization.name}</Text>
          </CardItem>
          <CardItem>
            <Text style={{fontFamily: 'Roboto'}}>
              Volunteers Needed: {event.volunteerCount}/
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
            <Text>{event.address}</Text>
          </CardItem>
          <CardItem>
            <Text>{event.description}</Text>
          </CardItem>
          <CardItem>
            <Button
              style={{backgroundColor: '#F5B39D'}}
              onPress={() => handleClick()}
            >
              <Text style={{fontFamily: 'Roboto'}}>Edit This Event</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </React.Fragment>
  )
}

OrgEventPage.navigationOptions = ({navigation}) => {
  return {
    title: navigation.state.params.title
  }
}

export default withNavigation(OrgEventPage)
