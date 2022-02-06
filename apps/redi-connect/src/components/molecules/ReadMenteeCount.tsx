import { Content } from 'react-bulma-components'
import { connect } from 'react-redux'

import { RedProfile } from '@talent-connect/shared-types'
import { REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
}

function Me ({
  profile: { menteeCountCapacity, optOutOfMenteesFromOtherRediLocation, rediLocation }
}: Props) {

  return (
    <Content>
      {menteeCountCapacity &&
        <p>{menteeCountCapacity}</p>}
      {!optOutOfMenteesFromOtherRediLocation && (
        <p>
          Let mentees in my location ({REDI_LOCATION_NAMES[rediLocation]}) AND
          other locations apply for mentorship
        </p>)}
      {optOutOfMenteesFromOtherRediLocation && (
        <p>
          Only let mentees from my own location (
          {REDI_LOCATION_NAMES[rediLocation]}) apply for mentorship
        </p>)}
    </Content>
  )
}

export default {
  /** */
  Me: connect(mapStateToProps, {})(Me),
}
