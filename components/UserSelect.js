import React from 'react'
import {ImageBackground, StyleSheet, Dimensions} from 'react-native'
import {Container, Content, Text, Button, Card, Title} from 'native-base'

const {height, width} = Dimensions.get('window')

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
              <Title>
                <Text
                  style={{
                    color: 'white',
                    textShadowColor: 'pink',
                    textShadowRadius: 1
                  }}
                >
                  Volunteer
                </Text>
              </Title>
            </Button>
            <Button
              block
              warning
              style={styles.bottomButton}
              onPress={() => props.navigation.navigate('OrgLogin')}
            >
              <Title>
                <Text
                  style={{
                    color: 'white',
                    textShadowColor: 'orange',
                    textShadowRadius: 1
                  }}
                >
                  Organization
                </Text>
              </Title>
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
  backgroundImage: {width: width, height: height},

  container: {
    display: 'flex'
  },
  backgroundImage: {width: width, height: height}
})

export default UserSelect
