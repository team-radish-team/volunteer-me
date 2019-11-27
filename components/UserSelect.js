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

const UserSelect = props => {
  return (
    <React.Fragment>
      <Container
        style={{
          flex: 2,
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Content>
          <Button
            block
            info
            onPress={() => props.navigation.navigate('VolLogin')}
          >
            <Text>Volunteer</Text>
          </Button>
          <Button
            block
            warning
            style={{marginTop: 30}}
            onPress={() => props.navigation.navigate('OrgLogin')}
          >
            <Text>Organization</Text>
          </Button>
        </Content>
      </Container>
    </React.Fragment>
  )
}

export default UserSelect
