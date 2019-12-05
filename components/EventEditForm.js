import React from 'react'

import t from 'tcomb-form-native'
import {updateEventThunk} from '../store/singleEvent'
import {connect} from 'react-redux'
import {Container, Text, Button} from 'native-base'

let Form = t.form.Form

const Event = t.struct({
  eventName: t.maybe(t.String),
  description: t.maybe(t.String),
  volunteersNeeded: t.maybe(t.Number),
  dateOfEvent: t.maybe(t.Date),
  eventStart: t.maybe(t.Date),
  eventEnd: t.maybe(t.Date),
  Address: t.maybe(t.String)
})

const options = {
  fields: {
    dateOfEvent: {
      mode: 'date'
    },
    eventStart: {
      mode: 'time',
      config: {
        format: time => time.toString().slice(16, 24)
      }
    },
    eventEnd: {
      mode: 'time',
      config: {
        format: time => time.toString().slice(16, 24)
      }
    }
  }
}

class EventEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        eventName: this.props.navigation.state.params.event.title,
        description: this.props.navigation.state.params.event.description,
        volunteersNeeded: this.props.navigation.state.params.event
          .volunteerTargetNum,
        address: this.props.navigation.state.params.event.address
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange = value => {
    this.setState({value})
  }
  handleSubmit = () => {
    const eventId = this.props.navigation.state.params.orgEvent.id
    const values = this.refs.form.getValue()
    if (values) {
      const eventName = values.eventName
      const volunteersNeeded = values.volunteersNeeded
      const address = values.address
      const eventStart = values.eventStart
      const eventEnd = values.eventEnd
      const dateOfEvent = values.dateOfEvent
      const description = values.description
      const eventData = {
        eventName,
        description,
        volunteersNeeded,
        address,
        eventStart,
        eventEnd,
        dateOfEvent
      }
      this.props.updateEvent(eventData, eventId)
      this.props.navigation.navigate('OrgEventList')
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
            <Text>Submit</Text>
          </Button>
        </Container>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return state.singleEvent
}

const mapDispatch = dispatch => {
  return {
    updateEvent: (event, eventId) => dispatch(updateEventThunk(event, eventId))
  }
}

export default connect(mapState, mapDispatch)(EventEditForm)
