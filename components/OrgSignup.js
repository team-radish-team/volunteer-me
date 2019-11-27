import React, {useState} from 'react'
import {createOrganizationThunk} from '../store/singleOrganization'
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

const OrgSignup = () => {
  const dispatch = useDispatch()
  const initialState = {
    name: '',
    address: '',
    missionStatement: '',
    webUrl: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    password: ''
  }
  const [form, setForm] = useState(initialState)

  const handleChange = (event, name) => {
    setForm({...form, [name]: event.nativeEvent.text})
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(createOrganizationThunk(form))
    alert('Thanks for signing up!')
  }

  return (
    <Container>
      <Header />
      <Content>
        <Form style={{paddingBottom: 40}}>
          <Item floatingLabel onChange={() => setFirstName()}>
            <Icon active name="organization" type="Octicons" />
            <Input
              placeholder="Organization name"
              onChange={event => handleChange(event, 'name')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="md-person" type="Ionicons" />
            <Input
              placeholder="Contact First Name"
              onChange={event => handleChange(event, 'contactFirstName')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="profile" type="AntDesign" />
            <Input
              placeholder="Contact Last Name"
              onChange={event => handleChange(event, 'contactLastName')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="phone" type="FontAwesome" />
            <Input
              placeholder="Phone"
              onChange={event => handleChange(event, 'contactPhone')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="email" type="MaterialIcons" />
            <Input
              placeholder="Email"
              onChange={event => handleChange(event, 'contactEmail')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="pencil" type="Entypo" />
            <Input
              placeholder="Mission Statement"
              onChange={event => handleChange(event, 'missionStatement')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="web" type="MaterialCommunityIcons" />
            <Input
              placeholder="Website"
              onChange={event => handleChange(event, 'webUrl')}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name="address-book" type="FontAwesome" />
            <Input
              placeholder="Address"
              onChange={event => handleChange(event, 'address')}
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

export default OrgSignup
