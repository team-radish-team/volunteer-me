import React from 'react'
import {ImageBackground, StyleSheet, Dimensions} from 'react-native'
import {Container, Content, Text, Button, Card} from 'native-base'

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
            <Card transparent style={styles.card}>
              <Text style={styles.title}>CareRing</Text>
              <Text style={styles.text}>
                Connecting volunteers with nonprofits
              </Text>
            </Card>
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
    backgroundColor: '#F5B39D'
  },
  topButton: {backgroundColor: '#F16286', marginTop: 270},
  backgroundImage: {width: width, height: height},
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  backgroundImage: {width: width, height: height},
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    marginTop: 50
  },
  text: {color: 'white'},
  card: {display: 'flex', flexDirection: 'column', alignItems: 'center'}
})

export default UserSelect
