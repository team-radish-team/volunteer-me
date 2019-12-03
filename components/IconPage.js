import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateVolunteerThunk} from '../store/singleVolunteer'
import {Text, Alert} from 'react-native'
import {
  Container,
  Content,
  Icon,
  Header,
  Button,
  Card,
  CardItem
} from 'native-base'

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
  const thisVol = useSelector(state => state.singleVolunteer.signedUpVol)

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
    const volUpdate = {interests: ['animals', 'youth', 'art'], id: thisVol.id}
    dispatch(updateVolunteerThunk(volUpdate))
    Alert.alert('Done', 'Thanks for signing up!', [{text: 'OK'}], {
      cancelable: false
    })
    props.navigation.navigate('VolLogin')
  }

  return (
    <Container>
      <Header />
      <Content>
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FF8E72',
            paddingTop: 20,
            paddingBottom: 20
          }}
        >
          <Text style={{fontSize: 15}}>Select Your Top Three Interests</Text>
        </Card>

        <Card>
          <CardItem
            style={categories.animals === false ? inactiveStyle : activeStyle}
            cardBody
            button
            onPress={event => handlePress(event, 'animals')}
          >
            <Icon name="dog" type="FontAwesome5" />
            <Text style={{fontSize: 15}}>Animals</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={categories.youth === false ? inactiveStyle : activeStyle}
            cardBody
            button
            onPress={event => handlePress(event, 'youth')}
          >
            <Icon name="child" type="FontAwesome5" />

            <Text style={{fontSize: 15}}>Youth</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            style={
              categories.agriculture === false ? inactiveStyle : activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'agriculture')}
          >
            <Icon name="leaf" type="Entypo" />

            <Text style={{fontSize: 15}}>Agriculture</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={
              categories.environment === false ? inactiveStyle : activeStyle
            }
            cardBody
            button
            onPress={event => handlePress(event, 'environment')}
          >
            <Icon name="tree" type="MaterialCommunityIcons" />

            <Text style={{fontSize: 15}}>Environment</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={categories.art === false ? inactiveStyle : activeStyle}
            cardBody
            button
            onPress={event => handlePress(event, 'art')}
          >
            <Icon name="paint-brush" type="FontAwesome" />

            <Text style={{fontSize: 15}}>Art</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            style={categories.civic === false ? inactiveStyle : activeStyle}
            cardBody
            button
            onPress={event => handlePress(event, 'civic')}
          >
            <Icon name="news" type="Entypo" />

            <Text style={{fontSize: 15}}>Civic</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={categories.hunger === false ? inactiveStyle : activeStyle}
            cardBody
            button
            onPress={event => handlePress(event, 'hunger')}
          >
            <Icon name="food-apple" type="MaterialCommunityIcons" />

            <Text style={{fontSize: 15}}>Hunger</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={categories.education === false ? inactiveStyle : activeStyle}
            cardBody
            button
            onPress={event => handlePress(event, 'education')}
          >
            <Icon name="pencil" type="Entypo" />

            <Text style={{fontSize: 15}}>Education</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            style={categories.advocacy === false ? inactiveStyle : activeStyle}
            cardBody
            button
            onPress={event => handlePress(event, 'advocacy')}
          >
            <Icon name="person" type="MaterialIcons" />
            <Text style={{fontSize: 15}}>Advocacy</Text>
          </CardItem>
        </Card>
        <Button
          block
          style={{marginTop: 10, marginBottom: 10}}
          onPress={event => handleSubmit(event)}
        >
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  )
}

const activeStyle = {
  backgroundColor: '#FF8E72',
  paddingTop: 5,
  paddingBottom: 5,
  width: 375,
  justifyContent: 'center'
}

const inactiveStyle = {
  paddingTop: 5,
  paddingBottom: 5,
  width: 375,
  justifyContent: 'center'
}

export default IconPage
