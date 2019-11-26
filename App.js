import {Asset} from 'expo-asset'
import * as Font from 'expo-font'
import React, {useState} from 'react'
import {Platform, StatusBar, StyleSheet, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import ReactMap from './components/Map'
import {Provider} from 'react-redux'
import store from './store'

import VolunteerList from './components/VolunteerList'
import HomeScreen from './screens/HomeScreen'

const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Volunteers: VolunteerList,
    Map: ReactMap
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
