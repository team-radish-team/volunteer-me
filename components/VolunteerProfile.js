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

const VolunteerProfile = props => {
  const dispatch = useDispatch()
  const volunteer = useSelector(state => state.singleVolunteer)
  useEffect(() => dispatch(getVolunteerThunk(volunteer.id)), [volunteer.id])
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
                <Body style>
                  <Text>Email: {volunteer.email}</Text>
                  <Text>Phone Number: {volunteer.phone}</Text>
                  <Text>Interests:</Text>
                  {volunteer.interests.map(interest => {
                    return <Text>{interest} </Text>
                  })}
                </Body>
              </CardItem>
            </CardItem>
          </Card>
        </Content>
      </React.Fragment>
    )
  }
}

export default VolunteerProfile
