import React, {useState} from 'react'
import {createVolunteerThunk} from '../store/singleVolunteer'
import {useSelector, useDispatch} from 'react-redux'
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
import {ScrollableComponent} from 'react-native-keyboard-aware-scroll-view'

const SignupPage = () => {
  const dispatch = useDispatch()
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  }
  const [form, setForm] = useState(initialState)

  const handleChange = (event, name) => {
    console.log('handling change')
    console.log('name', name)
    setForm({...form, [name]: event.nativeEvent.text})
    console.log(form)
  }

  const handleSubmit = event => {
    event.preventDefault()

    console.log('submitting')
    console.log(form)

    dispatch(createVolunteerThunk(form))
    console.log('finished submitting front end')
  }

  return (
    <Container>
      <Header />
      <Content>
        <Form style={{paddingBottom: 40}}>
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
            <Input placeholder="Confirm password" secureTextEntry={true} />
          </Item>
        </Form>

        <Button block onPress={handleSubmit}>
          <Text>Submit</Text>
        </Button>
      </Content>
      <Footer />
    </Container>
  )
}

export default SignupPage
