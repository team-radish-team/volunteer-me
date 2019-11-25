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
import VolunteerCard from './VolunteerCard'

const VolunteerList = () => {
  const dispatch = useDispatch()
  const volunteers = useSelector(state => state.allVolunteers)
  useEffect(() => {
    dispatch(getVolunteersThunk())
  }, [])
  return (
    <React.Fragment>
      <Content>
        {volunteers.map(volunteer => {
          return <VolunteerCard key={volunteer.id} volunteer={volunteer} />
        })}
      </Content>
    </React.Fragment>
  )
}

export default VolunteerList
