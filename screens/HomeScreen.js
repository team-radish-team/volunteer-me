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
  console.log(props)
  return <Container></Container>
}

HomeScreen.navigationOptions = {
  header: null,
  //   //   tabBarIcon: ({focused, horizontal, tintColor}) => {
  //   //     const {routeName} = props.navigation.state
  //   //     let IconComponent = Ionicons
  //   //     let iconName
  //   //     if (routeName === 'Home') {
  //   //       iconName = `ios-information-circle${focused ? '' : '-outline'}`
  //   //       // Sometimes we want to add badges to some icons.
  //   //       // You can check the implementation below.
  //   //       IconComponent = HomeIconWithBadge
  //   //     } else if (routeName === 'Volunteers') {
  //   //       iconName = `ios-options`
  //   //     }
  //   //   },
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  }
}
