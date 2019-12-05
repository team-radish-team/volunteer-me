import React from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
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
  return (
    <Card>
      <CardItem
        button
        onPress={() => props.navigation.navigate('EventPage', props.event)}
      >
        <Left>
          <Text style={{fontFamily: 'Roboto'}}>{props.event.title}</Text>
        </Left>
      </CardItem>
      <CardItem
        cardBody
        button
        onPress={() => props.navigation.navigate('EventPage', props.event)}
      >
        <Image
          source={{uri: `${props.event.organization.orgImage}`}}
          style={{height: 200, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem
        button
        onPress={() => props.navigation.navigate('EventPage', props.event)}
      >
        <Body
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Text style={{fontFamily: 'Roboto'}}>{props.event.address}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}

export default EventCard
