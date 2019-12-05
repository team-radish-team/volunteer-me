import React, {useEffect} from 'react'
import {StyleSheet, Dimensions, View, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import t from 'tcomb-form-native'
import {addEventThunk} from '../store/allEvents'
import {connect} from 'react-redux'
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

const Event = t.struct({
  'Event Name': t.String,
  'Event Description': t.String,
  'Volunteers Needed': t.Number,
  'Date Of Event': t.Date,
  'Event Start Time': t.Date,
  'Event End Time': t.Date,
  Address: t.String
})

const options = {
  fields: {
    'Date Of Event': {
      mode: 'date'
    },
    'Event Start Time': {
      mode: 'time',
      config: {
        format: time => time.toString().slice(16, 24)
      }
    },
    'Event End Time': {
      mode: 'time',
      config: {
        format: time => time.toString().slice(16, 24)
      }
    }
  }
}

class AddEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onChange = value => {
    this.setState({value})
  }
  handleSubmit = () => {
    const values = this.refs.form.getValue()
    if (values) {
      const eventName = values['Event Name']
      const volunteersNeeded = values['Volunteers Needed']
      const address = values.Address
      const eventStart = values['Event Start Time']
      const eventEnd = values['Event End Time']
      const dateOfEvent = values['Date Of Event']
      const description = values['Event Description']
      const organizationId = this.props.organization.id
      this.props.addEvent(
        eventName,
        description,
        volunteersNeeded,
        address,
        eventStart,
        eventEnd,
        dateOfEvent,
        organizationId
      )
      this.props.navigation.navigate('Events')
    }
  }
  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Form
            ref="form"
            type={Event}
            value={this.state.value}
            onChange={this.onChange}
            options={options}
          />
          <Button rounded info onPress={() => this.handleSubmit()}>
            <Text style={{fontFamily: 'Roboto'}}>Add Event</Text>
          </Button>
        </Container>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addEvent: (
      eventName,
      description,
      volunteersNeeded,
      address,
      eventStart,
      eventEnd,
      dateOfEvent,
      organizationId
    ) =>
      dispatch(
        addEventThunk(
          eventName,
          description,
          volunteersNeeded,
          address,
          eventStart,
          eventEnd,
          dateOfEvent,
          organizationId
        )
      )
  }
}

const mapState = state => {
  return {
    organization: state.singleOrganization
  }
}

export default connect(mapState, mapDispatch)(AddEvent)
