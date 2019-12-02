import React, {useEffect} from 'react'
import {Content, Thumbnail} from 'native-base'
import {useDispatch, useSelector} from 'react-redux'

const VolunteerProfile = props => {
  const dispatch = useDispatch()
  const volunteer = useSelector(state => state.volunteer)
  console.log(volunteer)
  // useEffect(() =>
  //   dispatch(
  //     getOrganizationThunk(Number(props.match.params.organizationId)),
  //     []
  //   )
  // )
  return (
    <React.Fragment>
      <Content style={(flex = 0)}>
        <Thumbnail large source={{uri: props.volunteer.profilePic}} />
      </Content>
    </React.Fragment>
  )
}

export default VolunteerProfile
