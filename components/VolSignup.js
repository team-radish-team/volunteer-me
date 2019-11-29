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

const VolSignup = props => {
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
    if (name === 'email') {
      let newText = event.nativeEvent.text.toLowerCase()
      setForm({...form, [name]: newText})
    } else {
      setForm({...form, [name]: event.nativeEvent.text})
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    dispatch(createVolunteerThunk(form))
    props.navigation.navigate('Volunteer')
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

export default VolSignup
