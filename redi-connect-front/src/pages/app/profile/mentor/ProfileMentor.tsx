import React from 'react'
import Avatar from '../../../../components/organisms/Avatar'
// import { CategoryChip } from '../../../../components/CategoryChip'
// import { ProfileAvailableMenteeSlots } from '../../../../components/ProfileAvailableMenteeSlots'
// import { ProfileLanguages } from '../../../../components/ProfileLanguages'
// import { ProfileName } from '../../../../components/ProfileName'
// import { ProfileOccupation } from '../../../../components/ProfileOccupation'
// import { ProfileWorkPlace } from '../../../../components/ProfileWorkPlace'
import { RedProfile } from '../../../../types/RedProfile'
// import { ConnectionRequestForm } from './ConnectionRequestForm'
import { getRedProfile } from '../../../../services/auth/auth'
import { categoriesIdToLabelMap } from '../../../../config/config'

import { Columns, Element, Content, Tag, Heading as BulmaHeading } from 'react-bulma-components'
import Heading from '../../../../components/atoms/Heading'
import PipeList from '../../../../components/molecules/PipeList'
import Read from '../../../../components/molecules/Read'
import '../../me/Me.scss'

interface Props {
  mentor: RedProfile
}

export const ProfileMentor = (
  ({ mentor }: Props) => {
    const profile = getRedProfile()
    {/* {(mentor.numberOfPendingApplicationWithCurrentUser === 0 && profile.userType === 'mentee') && (
      <ConnectionRequestForm mentorId={mentor.id} />
    )}
    {mentor.numberOfPendingApplicationWithCurrentUser > 0 && (
      <p>You have already applied to this mentor.</p>
    )} */}

    return <>
      <Columns vCentered breakpoint="mobile">
        <Columns.Column size={3}>
          <Avatar />
        </Columns.Column>
        <Columns.Column size={9}>
          <Heading>{`${mentor.firstName} ${mentor.lastName}`}</Heading>
        </Columns.Column>
      </Columns>
      {mentor.personalDescription && <Element className="me__block">
        <Read title={`about ${mentor.firstName} ${mentor.lastName}`}>
          <BulmaHeading subtitle renderAs='p' size={5}>{`${mentor.personalDescription}`}</BulmaHeading>
        </Read>
      </Element>
      }
      {
        mentor.categories && <Element className="me__block">
          <Columns>
            <Columns.Column>
              <Read title="mentoring topics">
                <Tag.Group>
                  {mentor.categories.map(catId => (
                    <Tag key={catId} size="large">
                      {categoriesIdToLabelMap[catId]}
                    </Tag>
                  ))}
                </Tag.Group>
              </Read>
            </Columns.Column>
          </Columns>
        </Element>
      }
      <Element className="me__block">
        <Columns>
          {mentor.gender && <Columns.Column>
            <Read title="personal details">
              <Content className="me__block--mobile">
                {mentor.gender}
              </Content>
            </Read>
          </Columns.Column>}
          {mentor.languages && <Columns.Column>
            <Read title="languages">
              <PipeList items={mentor.languages} />
            </Read>
          </Columns.Column>}
        </Columns>
      </Element>
      {(mentor.mentor_occupation || mentor.mentor_workPlace) &&
        <Element className="me__block">
          <Columns>
            {mentor.mentor_occupation && <Columns.Column>
              <Read title="occupation">
                <Content className="me__block--mobile">
                  {mentor.mentor_occupation}
                </Content>
              </Read>
            </Columns.Column>}
            {mentor.mentor_workPlace && <Columns.Column>
              <Read title="company">
                <Content>
                  {mentor.mentor_workPlace}
                </Content>
              </Read>
            </Columns.Column>}
          </Columns>
        </Element>
      }
    </>
  }
)
