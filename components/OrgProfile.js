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
import {getOrganizationThunk} from '../store/singleOrganization'

const OrgProfile = props => {
  const dispatch = useDispatch()
  const organization = useSelector(state => state.singleOrganization)
  useEffect(() => dispatch(getOrganizationThunk(organization.id)), [
    organization.id
  ])
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

export default OrgProfile
