import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk} from '../store/allEvents'
import t from 'tcomb-form-native'
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
  constructor() {
    super()
    this.state = {}
  }
  onChange = value => {
    this.setState({value})
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
          />
          <Button rounded info>
            <Text>Login</Text>
          </Button>
        </Container>
      </React.Fragment>
    )
  }
}

export default VolLogin
