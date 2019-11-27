import React, {useEffect} from 'react'
import {Content} from 'native-base'
import {useDispatch, useSelector} from 'react-redux'
import {getOrganizationThunk} from '../store/singleOrganization'

const OrgProfile = props => {
  const dispatch = useDispatch()
  const organization = useSelector(state => state.organization)
  console.log(organization)
  // useEffect(() =>
  //   dispatch(
  //     getOrganizationThunk(Number(props.match.params.organizationId)),
  //     []
  //   )
  // )
  return (
    <React.Fragment>
      <Content></Content>
    </React.Fragment>
  )
}

export default OrgProfile
