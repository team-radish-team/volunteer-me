import React, {useState} from 'react'
import {createVolunteerThunk} from '../store/singleVolunteer'
import {useDispatch} from 'react-redux'
import {Text, StyleSheet} from 'react-native'

import {Container, Content, Button, Icon, Form, Item, Input} from 'native-base'

let validated = false
function validate(form) {
  if (
    form.firstName.length < 1 ||
    form.lastName.length < 1 ||
    form.email.length < 1 ||
    form.phone.length < 1 ||
    form.password.length < 1 ||
    form.confirmPassword.length < 1
  ) {
    alert(`You're missing a required field`)
  } else if (!form.email.includes('@')) {
    alert('Please provide a valid email')
  } else if (form.password !== form.confirmPassword) {
    alert('Passwords must match!')
  } else {
    validated = true
  }
}

const VolSignup = props => {
  const dispatch = useDispatch()

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }
  const [form, setForm] = useState(initialState)

  const handleChange = (event, name) => {
    if (name === 'email') {
      let newText = event.nativeEvent.text.toLowerCase()
      setForm({...form, [name]: newText})
    } else {
      setForm({...form, [name]: event.nativeEvent.text})
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    validate(form)
    if (validated === true) {
      existsVar = await dispatch(createVolunteerThunk(form))
      if (existsVar === 'exists') {
        alert('Please use a different email.')
      } else {
        props.navigation.navigate('IconPage')
      }
    }
  }

  const secureText = password => {
    let visibleText = ''
    for (let i = 0; i < password.length; i++) {
      visibleText += '*'
    }
    return visibleText
  }

  return (
    <Container>
      <Content>
        <Form style={styles.form}>
          <Item floatingLabel onChange={() => setFirstName()}>
            <Icon active name="md-person" type="Ionicons" />
            <Input
              placeholder="First Name"
              onChange={event => handleChange(event, 'firstName')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="profile" type="AntDesign" />
            <Input
              placeholder="Last Name"
              onChange={event => handleChange(event, 'lastName')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="email" type="MaterialIcons" />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={event => handleChange(event, 'email')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="phone" type="FontAwesome" />
            <Input
              placeholder="Phone"
              onChange={event => handleChange(event, 'phone')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="lock" type="Entypo" />
            <Input
              placeholder="Password"
              onChange={event => handleChange(event, 'password')}
              value={secureText(form.password)}
            />
          </Item>
          <Item floatingLabel last>
            <Icon active name="lock" type="Entypo" />
            <Input
              placeholder="Confirm Password"
              onChange={event => handleChange(event, 'confirmPassword')}
              value={secureText(form.confirmPassword)}
            />
          </Item>
        </Form>

        <Button
          style={styles.buttonStyle}
          block
          onPress={event => handleSubmit(event)}
        >
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default VolSignup

const styles = StyleSheet.create({
  buttonStyle: {backgroundColor: '#F16286'},
  form: {paddingTop: 0, paddingBottom: 40}
})
