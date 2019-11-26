import React from 'react'
import {Container, Header, Content, Button} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export default function HomeScreen(props) {
  return <Container></Container>
}

HomeScreen.navigationOptions = {
  header: null,
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  }
}
