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
import HomeScreen from './components/HomeScreen'
import EventList from './components/EventList'

const VolunteerTabs = createBottomTabNavigator(
  {
    Events: EventList,
    Map: ReactMap,
    Profile: VolunteerList
  },
  {
    initialRouteName: 'Events'
  }
)

const AppContainer = createAppContainer(VolunteerTabs)

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
