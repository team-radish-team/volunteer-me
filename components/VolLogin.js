import React from 'react'
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

      const email = values.email.toLowerCase()


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
<<<<<<< HEAD
          <Button info onPress={() => this.handleSubmit()}>
=======
          <Button rounded info onPress={() => this.handleSubmit()}>
>>>>>>> bbbe97f1e20c8f1c40f9de2e19d84627971acfc1
            <Text>Login</Text>
          </Button>
          <Text
            style={{
              paddingTop: 30,
              paddingBottom: 10
            }}
          >
            Don't have an account?
          </Text>
          <Button
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
<<<<<<< HEAD
=======

>>>>>>> bbbe97f1e20c8f1c40f9de2e19d84627971acfc1
const mapDispatch = dispatch => {
  return {
    auth: (email, password, type) => dispatch(auth(email, password, type))
  }
}
<<<<<<< HEAD
=======

>>>>>>> bbbe97f1e20c8f1c40f9de2e19d84627971acfc1
export default connect(null, mapDispatch)(VolLogin)
