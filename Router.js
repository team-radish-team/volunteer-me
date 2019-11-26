import React from 'react'
import {StyleSheet, Text, View, AppRegistry} from 'react-native'
import {NativeRouter, Route, Link} from 'react-router-native'
import Map from './components/Map'

export default class Router extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" />
        <Route path="/volunteer" />
        <Route path="/event" />
        <Route exact path="/map" component={Map} />
      </NativeRouter>
    )
  }
}

AppRegistry.registerComponent('Router', () => Router)
