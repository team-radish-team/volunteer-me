import React from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
import {Button, Text} from 'native-base'
import {logout} from '../store/singleOrganization'
import {useDispatch} from 'react-redux'
import {withNavigation} from 'react-navigation'

const OrgLogoutButton = props => {
  const dispatch = useDispatch()

  handleLogOut = () => {
    dispatch(logout())
    props.navigation.navigate('Login')
  }

  return (
    <Button onPress={() => handleLogOut()}>
      <Text style={{fontFamily: 'Roboto'}}>Sign Out</Text>
    </Button>
  )
}

export default withNavigation(OrgLogoutButton)
