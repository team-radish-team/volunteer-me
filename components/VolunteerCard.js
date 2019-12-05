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
    fontSize: 30,
    fontFamily: 'Roboto'
  }
})

const VolunteerCard = props => {
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail
            source={{
              uri: props.volunteer.profilePic
            }}
          />
        </Left>
        <Body
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.name}>{props.volunteer.firstName}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}

export default VolunteerCard
