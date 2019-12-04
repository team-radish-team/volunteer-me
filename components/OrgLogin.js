import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import {auth} from '../store/singleOrganization'
import {Container, Text, Button} from 'native-base'

let Form = t.form.Form

const Org = t.struct({
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
      const email = values.email.toLowerCase()
      const type = this.state.type
      this.props.auth(email, password, type)

      this.props.auth(email, password, type)

      this.props.navigation.navigate('Organization')
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
            type={Org}
            value={this.state.value}
            onChange={this.onChange}
            options={options}
          />
          <Button style={buttonStyle} info onPress={() => this.handleSubmit()}>
            <Text>Login</Text>
          </Button>
          <Text style={{paddingTop: 30, paddingBottom: 10}}>
            Don't have an account?
          </Text>
          <Button
            style={buttonStyle}
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

const buttonStyle = {backgroundColor: '#F5B39D'}
