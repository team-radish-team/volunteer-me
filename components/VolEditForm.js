import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk} from '../store/allEvents'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import {updateVolunteerThunk} from '../store/singleVolunteer'
import {Container, Text, Button} from 'native-base'

let Form = t.form.Form

const Email = t.subtype(t.String, email => {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(String(email).toLowerCase())
})

const Vol = t.struct({
  email: t.maybe(Email),
  password: t.maybe(t.String),
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String),
  phone: t.maybe(t.String)
})

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
}

class VolEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        email: this.props.email,
        password: this.props.password,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        phone: this.props.phone
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange = value => {
    this.setState({value})
  }
  handleSubmit = () => {
    const volunteerId = this.props.id
    const values = this.refs.form.getValue()
    if (values) {
      const email = values.email
      const password = values.password
      const firstName = values.firstName
      const lastName = values.lastName
      const phone = values.phone
      const volunteerData = {
        email,
        password,
        firstName,
        lastName,
        phone
      }
      this.props.updateVolunteer(volunteerData, volunteerId)
      this.props.navigation.navigate('VolunteerProfile')
    }
  }
  render() {
    return (
      <ScrollView>
        <Container
          style={{
            flex: 2,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Form
            ref="form"
            type={Vol}
            value={this.state.value}
            onChange={this.onChange}
            options={options}
            style={{fontFamily: 'Roboto'}}
          />
<<<<<<< HEAD
          <Button rounded info onPress={() => this.handleSubmit()}>
            <Text style={{fontFamily: 'Roboto'}}>Submit</Text>
=======
          <Button
            rounded
            info
            style={{backgroundColor: '#F5B39D'}}
            onPress={() => this.handleSubmit()}
          >
            <Text>Submit</Text>
>>>>>>> 054139c4d39ff1d9de62c7c8f0e1a8c083464a66
          </Button>
        </Container>
      </ScrollView>
    )
  }
}

const mapState = state => {
  return state.singleVolunteer
}

const mapDispatch = dispatch => {
  return {
    updateVolunteer: (volunteer, volunteerId) =>
      dispatch(updateVolunteerThunk(volunteer, volunteerId))
  }
}

export default connect(mapState, mapDispatch)(VolEditForm)
