import { FC } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { RedProfile } from '@talent-connect/shared-types'
import { RootState } from '../../redux/types'
import {
  Caption,
  Placeholder,
  PipeList,
} from '@talent-connect/shared-atomic-design-components'
import { GENDERS } from '@talent-connect/shared-config'
import { mapStateToProps } from '../../helpers';

interface Props {
  profile: RedProfile
  caption?: boolean
}

const ReadPersonalDetail: FC<Props> = ({
  profile: { gender, birthDate },
  caption = false
}) => {
  
  const age = moment().diff(birthDate, 'years')

  const detailsList: string[] = gender ? [GENDERS[gender]] : []
  if (age) detailsList.push(`${age} years old`)

  if (!gender && !age)
    return <Placeholder>Input your gender and date of birth.</Placeholder>

  return (
    <>
      {caption &&
        <Caption>Personal Details</Caption>}
      <PipeList items={detailsList} />
    </>
  )
}

export default {
  /** */
  Me: connect(mapStateToProps, {})(ReadPersonalDetail),
  /** */
  Some: ({ profile }: Props) => <ReadPersonalDetail profile={profile} caption />,
}
