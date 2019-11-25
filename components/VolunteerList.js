import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getVolunteersThunk} from '../store/allVolunteers'
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

const VolunteerList = () => {
  const dispatch = useDispatch()
  const volunteers = useSelector(state => state.allVolunteers)
  useEffect(() => {
    dispatch(getVolunteersThunk())
  }, [])
  return (
    <React.Fragment>
      {console.log(volunteers)}
      <Text>Ok</Text>
    </React.Fragment>
  )
}

export default VolunteerList
