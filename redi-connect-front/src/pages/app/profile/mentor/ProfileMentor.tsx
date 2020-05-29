import React from 'react'
import { Heading } from '../../../../components/atoms'
import {
  ReadAbout,
  ReadMentoring,
  ReadLanguages,
  ReadPersonalDetail,
  ReadOccupation
} from '../../../../components/molecules'
import Avatar from '../../../../components/organisms/Avatar'
import { RedProfile } from '../../../../types/RedProfile'
import { Columns, Element } from 'react-bulma-components'

interface Props {
  mentor: RedProfile
}

export const ProfileMentor = ({ mentor }: Props) => {
  return (<>
    <Columns vCentered breakpoint="mobile">
      <Columns.Column size={3}>
        <Avatar profile={mentor} />
      </Columns.Column>
      <Columns.Column size={9}>
        <Heading>{`${mentor.firstName} ${mentor.lastName}`}</Heading>
      </Columns.Column>
    </Columns>

    <Element className="block-separator">
      <ReadAbout.Some profile={mentor} />
    </Element>

    {mentor.categories && <Element className="block-separator">
      <ReadMentoring.Some profile={mentor} />
    </Element>}

    {(mentor.languages && (mentor.gender || mentor.age)) && <Element className="block-separator">
      <Columns>
        {(mentor.gender || mentor.age) && <Columns.Column>
          <ReadPersonalDetail.Some profile={mentor} />
        </Columns.Column>}
        <Columns.Column>
          <ReadLanguages.Some profile={mentor} />
        </Columns.Column>
      </Columns>
    </Element>
    }
    {mentor.mentor_occupation && <Element className="block-separator">
      <ReadOccupation.Some profile={mentor} />
    </Element>
    }
  </>)
}
