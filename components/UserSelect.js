import React from 'react'
import {ImageBackground, StyleSheet} from 'react-native'
import {Container, Content, Text, Button, Card} from 'native-base'

const UserSelect = props => {
  return (
    <React.Fragment>
      <Container style={styles.container}>
        <ImageBackground
          source={require('../assets/images/chicago.jpg')}
          style={styles.backgroundImage}
        >
          <Content>
            <Button
              block
              info
              onPress={() => props.navigation.navigate('VolLogin')}
              style={styles.topButton}
            >
              <Text>Volunteer</Text>
            </Button>
            <Button
              block
              warning
              style={styles.bottomButton}
              onPress={() => props.navigation.navigate('OrgLogin')}
            >
              <Text>Organization</Text>
            </Button>
          </Content>
        </ImageBackground>
      </Container>
    </React.Fragment>
  )
}

UserSelect.navgiationOptions = {
  header: null
}

const styles = StyleSheet.create({
  bottomButton: {
    marginTop: 40,
    marginBottom: 30,
    backgroundColor: '#F5B39D'
  },
  topButton: {backgroundColor: '#F16286', marginTop: 360},
  backgroundImage: {width: 400, height: 625},
  container: {
    display: 'flex'
  }
})

export default UserSelect
