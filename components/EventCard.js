import React from 'react'
import {StyleSheet, Dimensions, View} from 'react-native'
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

const styles = StyleSheet.create({
  name: {
    fontSize: 30
  }
})

const EventCard = props => {
  console.log(props.event.address)
  return (
    <Card>
      <CardItem button onPress={() => props.navigation.navigate('EventPage')}>
        <Left>
          {/* <Thumbnail
            source={
              {
                uri: props.event.profilePic
              }
            }
          /> */}
          <Text>{props.event.title}</Text>
        </Left>
        <Body
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {/* <Text style={styles.name}>{props.event.description}</Text> */}
          <Text>{props.event.address}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}

export default EventCard
