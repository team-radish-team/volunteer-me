import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk} from '../store/allEvents'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import {auth} from '../store/singleVolunteer'
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base'

let Form = t.form.Form

const Vol = t.struct({
  email: t.String,
  password: t.String
})

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
}

class VolLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {type: 'volunteer'}
  }
  onChange = value => {
    this.setState({value})
  }

  handleSubmit = () => {
    const values = this.refs.form.getValue()
    if (values) {
      const email = values.email
      const password = values.password
      const type = this.state.type
      this.props.auth(email, password, type)
      this.props.navigation.navigate('Volunteer')
    }
  }

  render() {
    return (
      <React.Fragment>
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
          />
          <Button rounded info onPress={() => this.handleSubmit()}>
            <Text>Login</Text>
          </Button>
          <Text style={{paddingTop: 30, paddingBottom: 10}}>
            Don't have an account?
          </Text>
          <Button
            rounded
            info
            onPress={() => this.props.navigation.navigate('VolSignup')}
          >
            <Text>Sign Up</Text>
          </Button>
        </Container>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (email, password, type) => dispatch(auth(email, password, type))
  }
}

export default connect(null, mapDispatch)(VolLogin)
