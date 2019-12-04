import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {getEventsThunk} from '../store/allEvents'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import {updateOrganizationThunk} from '../store/singleOrganization'
import {Container, Text, Button} from 'native-base'

let Form = t.form.Form

const Email = t.subtype(t.String, email => {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(String(email).toLowerCase())
})

// const Phone = t.subtype(t.String, phone => {
//   const reg = /^\d{3}-\d{3}-\d{4}$/
//   return reg.test(phone)
// })

const Url = t.subtype(t.String, webUrl => {
  const reg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  return reg.test(String(webUrl))
})

const Org = t.struct({
  email: t.maybe(Email),
  password: t.maybe(t.String),
  orgName: t.maybe(t.String),
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String),
  phone: t.maybe(t.String),
  mission: t.maybe(t.String),
  webUrl: t.maybe(Url),
  address: t.maybe(t.String)
})

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
}

class OrgEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        email: this.props.contactEmail,
        password: this.props.password,
        orgName: this.props.name,
        firstName: this.props.contactFirstName,
        lastName: this.props.contactLastName,
        phone: this.props.contactPhone,
        mission: this.props.missionStatement,
        webUrl: this.props.webUrl,
        address: this.props.address
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange = value => {
    this.setState({value})
  }
  handleSubmit = () => {
    const organizationId = this.props.id
    const values = this.refs.form.getValue()
    if (values) {
      const email = values.email
      const password = values.password
      const orgName = values.orgName
      const firstName = values.firstName
      const lastName = values.lastName
      const phone = values.phone
      const mission = values.mission
      const webUrl = values.webUrl
      const address = values.address
      const organizationData = {
        email,
        password,
        orgName,
        firstName,
        lastName,
        phone,
        mission,
        webUrl,
        address
      }
      this.props.updateOrganization(organizationData, organizationId)
      this.props.navigation.navigate('OrgProfile')
    }
  }
  render() {
    return (
      <ScrollView>
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
          <Button rounded info onPress={() => this.handleSubmit()}>
            <Text>Submit</Text>
          </Button>
        </Container>
      </ScrollView>
    )
  }
}

const mapState = state => {
  return state.singleOrganization
}

const mapDispatch = dispatch => {
  return {
    updateOrganization: (organization, organizationId) =>
      dispatch(updateOrganizationThunk(organization, organizationId))
  }
}

export default connect(mapState, mapDispatch)(OrgEditForm)
