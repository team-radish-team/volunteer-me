import React, {useState} from 'react'
import {createVolunteerThunk} from '../store/singleVolunteer'
import {useSelector, useDispatch, Provider} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native'

import {
  Header,
  Container,
  Footer,
  Content,
  Left,
  Button,
  Right,
  Body,
  Card,
  Icon,
  CardItem,
  FooterTab,
  Form,
  Item,
  Input,
  Label
} from 'native-base'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const dispatch = useDispatch()

  handleSubmit = () => {
    console.log('submitting')
    dispatch(createVolunteerThunk())
  }

  return (
    <Container>
      <Header />
      <Content>
        <Form style={{paddingBottom: 40}}>
          <Item floatingLabel>
            <Icon active name="md-person" type="Ionicons" />
            <Input placeholder="First name" />
          </Item>
          <Item floatingLabel>
            <Icon active name="profile" type="AntDesign" />
            <Input placeholder="Last name" />
          </Item>
          <Item floatingLabel>
            <Icon active name="email" type="MaterialIcons" />
            <Input placeholder="email" />
          </Item>
          <Item floatingLabel>
            <Icon active name="phone" type="FontAwesome" />
            <Input placeholder="phone" />
          </Item>
          <Item floatingLabel>
            <Icon active name="lock" type="Entypo" />
            <Input placeholder="password" secureTextEntry={true} />
          </Item>
          <Item floatingLabel last>
            <Icon active name="lock" type="Entypo" />
            <Input placeholder="Confirm password" secureTextEntry={true} />
          </Item>
        </Form>

        <Button block onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </Button>
      </Content>
      <Footer />
    </Container>
  )
}
