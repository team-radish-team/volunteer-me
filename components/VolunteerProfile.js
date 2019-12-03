import React, {useEffect} from 'react'
import {
  Content,
  Thumbnail,
  Card,
  CardItem,
  Text,
  Body,
  Title,
  Header
} from 'native-base'
import {useDispatch, useSelector} from 'react-redux'
import {getVolunteerThunk} from '../store/singleVolunteer'
import VolLogoutButton from './VolLogoutButton'

const VolunteerProfile = props => {
  const dispatch = useDispatch()
  const volunteer = useSelector(state => state.singleVolunteer)
  useEffect(() => {
    dispatch(getVolunteerThunk(volunteer.id))
  }, [volunteer.id])
  console.log(props)
  if (!volunteer) {
    return <React.Fragment></React.Fragment>
  } else {
    return (
      <React.Fragment>
        <Content style={{flex: 0}}>
          <Header noShadow>
            <Title>
              {volunteer.firstName} {volunteer.lastName}
            </Title>
          </Header>
          <Card style={{flex: 2, flexDirection: 'row'}}>
            <Thumbnail large source={{uri: volunteer.profilePic}} />
            <CardItem>
              <CardItem>
                <Body>
                  <Text>Email: {volunteer.email}</Text>
                  <Text>Phone Number: {volunteer.phone}</Text>
                  <Text>Interests:</Text>
                  <React.Fragment>
                    {volunteer.interests.map(interest => {
                      return <Text key={interest}>{interest}</Text>
                    })}
                  </React.Fragment>
                </Body>
              </CardItem>
            </CardItem>
          </Card>
        </Content>
      </React.Fragment>
    )
  }
}

VolunteerProfile.navigationOptions = ({navigation}) => {
  return {
    headerLeft: <VolLogoutButton />,
    title: 'Profile'
  }
}

export default VolunteerProfile
