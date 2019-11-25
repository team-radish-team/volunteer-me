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

const VolunteerCard = () => {
  return (
    <Content>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri:
                  'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
              }}
            />
          </Left>
          <Body
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Text style={styles.name}>Andrew P.</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  )
}

export default VolunteerCard
