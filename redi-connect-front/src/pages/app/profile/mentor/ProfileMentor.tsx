import React from 'react'
import { Heading } from '../../../../components/atoms'
import {
  ReadAbout,
  ReadMentoring,
  ReadLanguages,
  Read
} from '../../../../components/molecules'
import Avatar from '../../../../components/organisms/Avatar'
import { RedProfile } from '../../../../types/RedProfile'
import { Columns, Element, Content } from 'react-bulma-components'

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

    {(mentor.languages && mentor.gender) && <Element className="block-separator">
      <Columns>
        {mentor.gender && <Columns.Column>
          <Read title="personal details">
            <Content className="block-separator">
              {mentor.gender}
            </Content>
          </Read>
        </Columns.Column>}
        <Columns.Column>
          <ReadLanguages.Some profile={mentor} />
        </Columns.Column>
      </Columns>
    </Element>
    }
    {(mentor.mentor_occupation || mentor.mentor_workPlace) &&
      <Element className="block-separator">
        <Columns>
          {mentor.mentor_occupation && <Columns.Column>
            <Read title="occupation">
              <Content className="block-separator">
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
  </>)
}
