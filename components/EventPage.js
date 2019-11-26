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

const EventPage = props => {
  return (
    <React.Fragment>
      <Content>
        <Text>Event Name</Text>
        <Image
          source={{
            uri:
              'https://res.cloudinary.com/dssu5deur/image/upload/v1574461329/capstone/1_pvkdas.jpg'
          }}
          style={{flex: 1, width: null, height: 400}}
        />
        <Text>Num Volunteers Needed</Text>
        <Text>Organization Name</Text>
        <Text>Start Time - End Time</Text>
        <Text>Location</Text>
        <Text>Event Description</Text>
        <Button>
          <Text>I'm Attending!</Text>
        </Button>
      </Content>
    </React.Fragment>
  )
}

export default EventPage
