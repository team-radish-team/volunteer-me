import React from 'react'

import {Container, Content, Text, Button} from 'native-base'

const UserSelect = props => {
  return (
    <React.Fragment>
      <Container
        style={{
          flex: 2,
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <Content>
          <Button
            block
            info
            onPress={() => props.navigation.navigate('VolLogin')}
            style={{backgroundColor: '#F16286'}}
          >
            <Text>Volunteer</Text>
          </Button>
          <Button
            block
            warning
            style={{marginTop: 30, backgroundColor: '#F5B39D'}}
            onPress={() => props.navigation.navigate('OrgLogin')}
          >
            <Text>Organization</Text>
          </Button>
        </Content>
      </Container>
    </React.Fragment>
  )
}

export default UserSelect
