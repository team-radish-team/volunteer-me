import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getOrgEventsThunk} from '../store/allEvents'
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
import OrgEventCard from './OrgEventCard'

const OrgEventList = props => {
  const dispatch = useDispatch()
  const events = useSelector(state => state.allEvents)
  useEffect(() => {
    dispatch(getOrgEventsThunk(1))
  }, [])
  return (
    <React.Fragment>
      <Content>
        {events.map(event => {
          return (
            <OrgEventCard
              key={event.id}
              event={event}
              navigation={props.navigation}
            />
          )
        })}
      </Content>
    </React.Fragment>
  )
}

OrgEventList.navigationOptions = {
  title: 'Events'
}

export default OrgEventList
