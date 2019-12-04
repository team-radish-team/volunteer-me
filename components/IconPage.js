import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateVolunteerThunkPut} from '../store/singleVolunteer'
import {Text, Alert, StyleSheet} from 'react-native'
import {Container, Content, Icon, Button, Card, CardItem} from 'native-base'

const selected = []

const IconPage = props => {
  const initialState = {
    animals: false,
    youth: false,
    agriculture: false,
    environment: false,
    art: false,
    civic: false,
    hunger: false,
    education: false,
    advocacy: false
  }
  const [categories, setCategories] = useState(initialState)
  const dispatch = useDispatch()
  const thisVol = useSelector(state => state.singleVolunteer)

  handlePress = function(event, name) {
    event.preventDefault()
    if (selected.length < 3 && categories[name] === false) {
      selected.push(name)
      setCategories({...categories, [name]: true})
      return categories
    } else if (categories[name] === true) {
      setCategories({...categories, [name]: false})
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] === name) {
          selected.splice(i, 1)
        }
      }
    }
  }

  handleSubmit = function(event) {
    event.preventDefault()
    console.log('thisVol', thisVol)
    const volUpdate = {interests: ['animals', 'youth', 'art'], id: thisVol.id}
    dispatch(updateVolunteerThunkPut(volUpdate))
    Alert.alert(
      'Done',
      'Thanks for signing up!',
      [{text: 'OK', onPress: () => props.navigation.navigate('VolLogin')}],
      {
        cancelable: false
      }
    )
  }

  return (
    <Container>
      <Content>
        <Card style={styles.cardStyle}>
          <Text style={styles.cardText}>Select Your Top Three Interests</Text>
        </Card>

        <Card>
          <CardItem
            style={
              categories.animals === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'animals')}
          >
            <Icon name="dog" type="FontAwesome5" />
            <Text style={styles.textStyle}>Animals</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={
              categories.youth === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'youth')}
          >
            <Icon name="child" type="FontAwesome5" />

            <Text style={styles.textStyle}>Youth</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            style={
              categories.agriculture === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'agriculture')}
          >
            <Icon name="leaf" type="Entypo" />

            <Text style={styles.textStyle}>Agriculture</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={
              categories.environment === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'environment')}
          >
            <Icon name="tree" type="MaterialCommunityIcons" />

            <Text style={styles.textStyle}>Environment</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={
              categories.art === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'art')}
          >
            <Icon name="paint-brush" type="FontAwesome" />

            <Text style={styles.textStyle}>Art</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            style={
              categories.civic === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'civic')}
          >
            <Icon name="news" type="Entypo" />

            <Text style={styles.textStyle}>Civic</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={
              categories.hunger === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'hunger')}
          >
            <Icon name="food-apple" type="MaterialCommunityIcons" />

            <Text style={styles.textStyle}>Hunger</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={
              categories.education === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'education')}
          >
            <Icon name="pencil" type="Entypo" />

            <Text style={styles.textStyle}>Education</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={
              categories.advocacy === false
                ? styles.inactiveStyle
                : styles.activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'advocacy')}
          >
            <Icon name="person" type="MaterialIcons" />
            <Text style={styles.textStyle}>Advocacy</Text>
          </CardItem>
        </Card>
        <Button
          block
          style={styles.buttonStyle}
          onPress={event => handleSubmit(event)}
        >
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  activeStyle: {
    backgroundColor: '#F5B39D',
    paddingTop: 5,
    paddingBottom: 5,
    width: 375,
    justifyContent: 'center'
  },
  inactiveStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    width: 375,
    justifyContent: 'center'
  },
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F16286',
    paddingTop: 20,
    paddingBottom: 20
  },
  cardText: {fontSize: 15, color: 'white', fontWeight: 'bold'},
  buttonStyle: {marginTop: 10, marginBottom: 10, backgroundColor: '#F16286'},
  textStyle: {fontSize: 15}
})

export default IconPage
