import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
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
import normalize from '../utilities/timeConverter'
const EventPage = props => {
  const event = props.navigation.state.params
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
            <Text>
              Volunteers Needed: {event.volunteerCount}/
              {event.volunteerTargetNum}
            </Text>
          </CardItem>
          <CardItem>
            <Text>
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
            <Button>
              <Text>I'm Attending!</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </React.Fragment>
  )
}
EventPage.navigationOptions = ({navigation}) => {
  return {
    title: navigation.state.params.title
  }
}
export default EventPage
