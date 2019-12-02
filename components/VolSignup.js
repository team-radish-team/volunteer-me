import React, {useState} from 'react'
import {createVolunteerThunk} from '../store/singleVolunteer'
import {useDispatch} from 'react-redux'
import {Text} from 'react-native'

import {
  Header,
  Container,
  Footer,
  Content,
  Button,
  Icon,
  Form,
  Item,
  Input
} from 'native-base'

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

  const handleSubmit = event => {
    event.preventDefault()
    validate(form)
    if (validated === true) {
      dispatch(createVolunteerThunk(form))
      props.navigation.navigate('Volunteer')
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Form style={{paddingTop: 0, paddingBottom: 40}}>
          <Item floatingLabel onChange={() => setFirstName()}>
            <Icon active name="md-person" type="Ionicons" />
            <Input
              placeholder="First name"
              onChange={event => handleChange(event, 'firstName')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="profile" type="AntDesign" />
            <Input
              placeholder="Last name"
              onChange={event => handleChange(event, 'lastName')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="email" type="MaterialIcons" />
            <Input
              placeholder="email"
              value={form.email}
              onChange={event => handleChange(event, 'email')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="phone" type="FontAwesome" />
            <Input
              placeholder="phone"
              onChange={event => handleChange(event, 'phone')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="lock" type="Entypo" />
            <Input
              placeholder="password"
              secureTextEntry={true}
              onChange={event => handleChange(event, 'password')}
            />
          </Item>
          <Item floatingLabel last>
            <Icon active name="lock" type="Entypo" />
            <Input
              placeholder="Confirm password"
              onChange={event => handleChange(event, 'confirmPassword')}
              secureTextEntry={true}
            />
          </Item>
        </Form>

        <Button block onPress={event => handleSubmit(event)}>
          <Text>Submit</Text>
        </Button>
      </Content>
      <Footer />
    </Container>
  )
}

export default VolSignup
