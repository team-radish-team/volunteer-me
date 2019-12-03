import React, {Component} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateVolunteerThunk} from '../store/singleVolunteer'
import {Text} from 'react-native'
import {
  Container,
  Content,
  Icon,
  Header,
  Button,
  Card,
  CardItem
} from 'native-base'

export default class IconPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
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
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress = function(event, name) {
    event.preventDefault()

    if (this.state[name] === true) {
      this.setState({[name]: false})
      for (let i = 0; i < this.state.categories.length; i++) {
        if (this.state.categories[i] === name) {
          this.state.categories.splice(i, 1)
        }
      }
    } else if (this.state.categories.length < 3 && this.state[name] === false) {
      this.state.categories.push(name)
      this.setState({[name]: true})
    }
  }

  handleSubmit = function(event) {
    const dispatch = useDispatch()
    event.preventDefault()
    console.log('submitted')
    const thisVolunteer = useSelector(state => state.signedUpVol)
    const volUpdate = {interests: this.state.categories, id: thisVolunteer.id}
    dispatch(updateVolunteerThunk(volUpdate))
  }

  render() {
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
              style={this.state.animals === false ? inactiveStyle : activeStyle}
              cardBody
              button
              onPress={event => this.handlePress(event, 'animals')}
            >
              <Icon name="dog" type="FontAwesome5" />
              <Text style={{fontSize: 15}}>Animals</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem
              style={this.state.youth === false ? inactiveStyle : activeStyle}
              cardBody
              button
              onPress={event => this.handlePress(event, 'youth')}
            >
              <Icon name="child" type="FontAwesome5" />

              <Text style={{fontSize: 15}}>Youth</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem
              style={
                this.state.agriculture === false ? inactiveStyle : activeStyle
              }
              cardBody
              button
              onPress={event => this.handlePress(event, 'agriculture')}
            >
              <Icon name="leaf" type="Entypo" />

              <Text style={{fontSize: 15}}>Agriculture</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem
              style={
                this.state.environment === false ? inactiveStyle : activeStyle
              }
              cardBody
              button
              onPress={event => this.handlePress(event, 'environment')}
            >
              <Icon name="tree" type="MaterialCommunityIcons" />

              <Text style={{fontSize: 15}}>Environment</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem
              style={this.state.art === false ? inactiveStyle : activeStyle}
              cardBody
              button
              onPress={event => this.handlePress(event, 'art')}
            >
              <Icon name="paint-brush" type="FontAwesome" />

              <Text style={{fontSize: 15}}>Art</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem
              style={this.state.civic === false ? inactiveStyle : activeStyle}
              cardBody
              button
              onPress={event => this.handlePress(event, 'civic')}
            >
              <Icon name="news" type="Entypo" />

              <Text style={{fontSize: 15}}>Civic</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem
              style={this.state.hunger === false ? inactiveStyle : activeStyle}
              cardBody
              button
              onPress={event => this.handlePress(event, 'hunger')}
            >
              <Icon name="food-apple" type="MaterialCommunityIcons" />

              <Text style={{fontSize: 15}}>Hunger</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem
              style={
                this.state.education === false ? inactiveStyle : activeStyle
              }
              cardBody
              button
              onPress={event => this.handlePress(event, 'education')}
            >
              <Icon name="pencil" type="Entypo" />

              <Text style={{fontSize: 15}}>Education</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem
              style={
                this.state.advocacy === false ? inactiveStyle : activeStyle
              }
              cardBody
              button
              onPress={event => this.handlePress(event, 'advocacy')}
            >
              <Icon name="person" type="MaterialIcons" />
              <Text style={{fontSize: 15}}>Advocacy</Text>
            </CardItem>
          </Card>
          <Button
            block
            style={{marginTop: 10, marginBottom: 10}}
            onPress={event => this.handleSubmit(event)}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    )
  }
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
