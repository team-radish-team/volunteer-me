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
  Right,
  Tabs,
  Tab
} from 'native-base'
import OrgEventCard from './OrgEventCard'

const OrgEventList = props => {
  const organization = useSelector(state => state.singleOrganization)
  const dispatch = useDispatch()
  const events = useSelector(state => state.allEvents.allEvents)
  useEffect(() => {
    dispatch(getOrgEventsThunk(organization.id))
  }, [organization.id])
  if (!organization) {
    return <React.Fragment></React.Fragment>
  } else {
    return (
      <React.Fragment>
        <Tabs>
          <Tab heading="Upcoming Events">
            <Content>
              {events.map(event => {
                if (event.isActive) {
                  return (
                    <OrgEventCard
                      key={event.id}
                      event={event}
                      navigation={props.navigation}
                    />
                  )
                }
              })}
            </Content>
          </Tab>
          <Tab heading="Past Events">
            <Content>
              {events.map(event => {
                if (!event.isActive) {
                  return (
                    <OrgEventCard
                      key={event.id}
                      event={event}
                      navigation={props.navigation}
                    />
                  )
                }
              })}
            </Content>
          </Tab>
        </Tabs>
      </React.Fragment>
    )
  }
}

OrgEventList.navigationOptions = {
  title: 'Events'
}

export default OrgEventList
