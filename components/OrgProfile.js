import React, {useEffect} from 'react'
import {
  Content,
  Thumbnail,
  Card,
  CardItem,
  Text,
  Body,
  Title,
  Header,
  Button
} from 'native-base'
import {useDispatch, useSelector} from 'react-redux'
import {getOrganizationThunk} from '../store/singleOrganization'
import OrgLogoutButton from './OrgLogoutButton'
import {withNavigation} from 'react-navigation'

const OrgProfile = props => {
  const dispatch = useDispatch()
  const organization = useSelector(state => state.singleOrganization)

  useEffect(() => {
    dispatch(getOrganizationThunk(organization.id)) 
  }, [organization.id])

  handleClick = () => {
    props.navigation.navigate('OrgEditForm')
  }

  if (!organization) {
    return <React.Fragment></React.Fragment>
  } else {
    return (
      <React.Fragment>
        <Content style={{flex: 0}}>
          <Header noShadow>
            <Title>{organization.name}</Title>
          </Header>
          <Card style={{flex: 2, flexDirection: 'row'}}>
            <Thumbnail large source={{uri: organization.orgImage}} />
            <CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Name: {organization.contactFirstName}{' '}
                    {organization.contactLastName}
                  </Text>
                  <Text>Email: {organization.contactEmail}</Text>
                  <Text>Phone Number: {organization.contactPhone}</Text>
                  <Text>Website: {organization.webUrl}</Text>
                </Body>
              </CardItem>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered style={{justifyContent: 'center'}}>
              <Text>{organization.missionStatement}</Text>
            </CardItem>
          </Card>
        </Content>
      </React.Fragment>
    )
  }
}

OrgProfile.navigationOptions = ({navigation}) => {
  return {
    headerLeft: <OrgLogoutButton />,
    title: 'Profile',
    headerRight: (
      <Button onPress={() => handleClick()}>
        <Text>Edit</Text>
      </Button>
    )
  }
}

export default withNavigation(OrgProfile)
