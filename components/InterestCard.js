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

const InterestCard = props => {
  let name, type
  switch (props.interest) {
    case 'animals':
      name = 'dog'
      type = 'FontAwesome5'
      break
    case 'youth':
      name = 'child'
      type = 'FontAwesome5'
      break
    case 'agriculture':
      name = 'leaf'
      type = 'Entypo'
      break
    case 'environment':
      name = 'tree'
      type = 'MaterialCommunityIcons'
      break
    case 'art':
      name = 'paint-brush'
      type = 'FontAwesome'
      break
    case 'civic':
      name = 'news'
      type = 'Entypo'
      break
    case 'hunger':
      name = 'food-apple'
      type = 'MaterialCommunityIcons'
      break
    case 'education':
      name = 'pencil'
      type = 'Entypo'
      break
    case 'advocacy':
      name = 'person'
      type = 'MaterialIcons'
      break
  }

  return (
    <Card>
      <CardItem>
        <Left>
          <Icon name={name} type={type} />
        </Left>
        <Body
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.name}>{props.interest}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}

export default InterestCard
