import React, {useState} from 'react'
import {createOrganizationThunk} from '../store/singleOrganization'
import {useDispatch} from 'react-redux'
import {Text, ScrollView} from 'react-native'
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
    form.name.length < 1 ||
    form.contactFirstName.length < 1 ||
    form.contactLastName.length < 1 ||
    form.contactEmail.length < 1 ||
    form.contactPhone.length < 1 ||
    form.missionStatement.lenth < 1 ||
    form.address.length < 1 ||
    form.password.length < 1 ||
    form.confirmPassword.length < 1 ||
    form.webUrl.length < 1
  ) {
    alert(`You're missing a required field`)
  } else if (!form.contactEmail.includes('@')) {
    alert('Please provide a valid email')
  } else if (form.webUrl.length < 1 || !form.webUrl.includes('.org')) {
    alert('Please provide a valid URL with .org')
  } else {
    validated = true
  }
}

function secureText(password) {
  let visibleText = ''
  for (let i = 0; i < password.length; i++) {
    visibleText += '*'
  }
  return visibleText
}

const OrgSignup = props => {
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
    password: '',
    confirmPassword: ''
  }
  const [form, setForm] = useState(initialState)

  const handleChange = (event, name) => {
    if (name === 'contactEmail' || name === 'webUrl') {
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
      dispatch(createOrganizationThunk(form))
      props.navigation.navigate('Organization')
    }
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
              value={form.contactEmail}
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
              value={form.webUrl}
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
              value={secureText(form.password)}
              onChange={event => handleChange(event, 'password')}
            />
          </Item>
          <Item floatingLabel last>
            <Icon active name="lock" type="Entypo" />
            <Input
              placeholder="Confirm password"
              value={secureText(form.confirmPassword)}
              onChange={event => handleChange(event, 'confirmPassword')}
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

export default OrgSignup
