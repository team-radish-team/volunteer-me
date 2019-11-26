import {Asset} from 'expo-asset'
import * as Font from 'expo-font'
import React, {useState} from 'react'
import {Platform, StatusBar, StyleSheet, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {createAppContainer} from 'react-navigation'
import ReactMap from './components/Map'
import {Provider} from 'react-redux'
import store from './store'
import {VolunteerTabs} from './navigation/navigators'

const AppContainer = createAppContainer(VolunteerTabs)

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
