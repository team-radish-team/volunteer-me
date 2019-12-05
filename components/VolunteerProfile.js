import React, {useEffect} from 'react'
import {ScrollView} from 'react-native'
import {
  Content,
  Thumbnail,
  Card,
  CardItem,
  Text,
  Body,
  Title,
  Tabs,
  Tab,
  Button,
  Header
} from 'native-base'
import {useDispatch, useSelector} from 'react-redux'
import {getVolunteerThunk} from '../store/singleVolunteer'
import {getVolunteerEventsThunk} from '../store/allEvents'
import VolLogoutButton from './VolLogoutButton'
import EventCard from './EventCard'
import {withNavigation} from 'react-navigation'

const VolunteerProfile = props => {
  const dispatch = useDispatch()
  const volunteer = useSelector(state => state.singleVolunteer)
  const events = useSelector(state => state.allEvents.volunteerEvents)
  useEffect(() => {
    dispatch(getVolunteerThunk(volunteer.id))
    dispatch(getVolunteerEventsThunk(volunteer.id))
  }, [volunteer.id])

  handleClick = () => {
    props.navigation.navigate('VolEditForm')
  }
  if (!volunteer) {
    return <React.Fragment></React.Fragment>
  } else {
    return (
      <React.Fragment>
        {volunteer.events ? (
          <Tabs>
            <Tab heading="Your Profile">
              <Content style={{flex: 0}} scrollEnabled={false}>
                <Header noShadow>
                  <Title style={{fontFamily: 'Roboto'}}>
                    {volunteer.firstName} {volunteer.lastName}
                  </Title>
                </Header>
                <Card style={{flex: 2, flexDirection: 'row'}}>
                  <Thumbnail large source={{uri: volunteer.profilePic}} />
                  <CardItem>
                    <CardItem>
                      <Body>
                        <Text style={{fontFamily: 'Roboto'}}>
                          Email: {volunteer.email}
                        </Text>
                        <Text style={{fontFamily: 'Roboto'}}>
                          Phone Number: {volunteer.phone}
                        </Text>
                        <Text style={{fontFamily: 'Roboto'}}>Interests:</Text>
                        {volunteer.interests.map(interest => {
                          return <Text key={interest}>{interest} </Text>
                        })}
                      </Body>
                    </CardItem>
                  </CardItem>
                </Card>
              </Content>
            </Tab>
            <Tab heading="Upcoming Events">
              <Content>
                {volunteer.events.map(event => {
                  if (event.isActive) {
                    return (
                      <EventCard
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
                      <EventCard
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
        ) : (
          <Text>No Events!</Text>
        )}
      </React.Fragment>
    )
  }
}

VolunteerProfile.navigationOptions = ({navigation}) => {
  return {
    title: 'Profile',
    headerRight: (
      <Button onPress={() => handleClick()}>
        <Text>Edit</Text>
      </Button>
    )
  }
}

export default withNavigation(VolunteerProfile)
