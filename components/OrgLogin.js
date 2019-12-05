import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import {auth} from '../store/singleOrganization'
import {Container, Text, Button} from 'native-base'
import {Image, StyleSheet} from 'react-native'

let Form = t.form.Form

const Org = t.struct({
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

class OrgLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {type: 'organization'}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onChange = value => {
    this.setState({value})
  }
  handleSubmit = () => {
    const values = this.refs.form.getValue()
    if (values) {
      const password = values.password

      const email = values.YourEmail.toLowerCase()
      const type = this.state.type
      this.props.auth(email, password, type)

      this.props.navigation.navigate('Organization')
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
            type={Org}
            value={this.state.value}
            onChange={this.onChange}
            options={options}
            style={styles.formStyle}
          />
          <Button
            style={styles.buttonStyle}
            info
            onPress={() => this.handleSubmit()}
          >
            <Text>Login</Text>
          </Button>
          <Text style={styles.text}>Don't have an account?</Text>
          <Button
            style={styles.buttonStyle}
            info
            onPress={() => this.props.navigation.navigate('OrgSignup')}
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

export default connect(null, mapDispatch)(OrgLogin)

const styles = StyleSheet.create({
  buttonStyle: {backgroundColor: '#F5B39D'},
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
  text: {paddingTop: 30, paddingBottom: 10},
  formStyle: {
    textAlign: 'center'
  }
})
