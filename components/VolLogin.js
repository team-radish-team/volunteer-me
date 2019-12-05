import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import {auth} from '../store/singleVolunteer'
import {Container, Text, Button} from 'native-base'
import {Image, StyleSheet} from 'react-native'

let Form = t.form.Form

const Vol = t.struct({
  YourEmail: t.String,
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
      const email = values.YourEmail.toLowerCase()
      const password = values.password
      const type = this.state.type
      this.props.auth(email, password, type)
      this.props.navigation.navigate('Volunteer')
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container style={styles.container}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.imageStyle}
          />
          <Form
            ref="form"
            type={Vol}
            value={this.state.value}
            onChange={this.onChange}
            options={options}
          />
          <Button
            style={styles.buttonColor}
            info
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Button>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <Button
            style={buttonStyle}
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

const buttonStyle = {backgroundColor: '#F16286'}

var styles = StyleSheet.create({
  buttonText: {alignSelf: 'center'},
  buttonColor: {backgroundColor: '#F16286'},
  imageStyle: {
    width: 225,
    height: 225
  },
  container: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bottomText: {
    paddingTop: 30,
    paddingBottom: 10,
    fontWeight: 'bold'
  }
})
