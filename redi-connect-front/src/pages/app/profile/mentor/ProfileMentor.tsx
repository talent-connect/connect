import React from 'react'
import StaticAvatar from '../../../../components/organisms/StaticAvatar'
import { RedProfile } from '../../../../types/RedProfile'
import { categoriesIdToLabelMap } from '../../../../config/config'
import { Columns, Element, Content, Tag, Heading as BulmaHeading } from 'react-bulma-components'
import Heading from '../../../../components/atoms/Heading'
import PipeList from '../../../../components/molecules/PipeList'
import Read from '../../../../components/molecules/Read'

interface Props {
  mentor: RedProfile
}

export const ProfileMentor = ({ mentor }: Props) => (
  <>
    <Columns vCentered breakpoint="mobile">
      <Columns.Column size={3}>
        <StaticAvatar />
      </Columns.Column>
      <Columns.Column size={9}>
        <Heading>{`${mentor.firstName} ${mentor.lastName}`}</Heading>
      </Columns.Column>
    </Columns>
    {mentor.personalDescription && <Element className="block-separator">
      <Read title={`about ${mentor.firstName} ${mentor.lastName}`}>
        <BulmaHeading subtitle renderAs='p' size={5}>{`${mentor.personalDescription}`}</BulmaHeading>
      </Read>
    </Element>
    }
    {
      mentor.categories && <Element className="block-separator">
        <Columns>
          <Columns.Column>
            <Read title="mentoring topics">
              <Tag.Group>
                {mentor.categories.map(catId => (
                  <Tag key={catId} size="large" rounded>
                    {categoriesIdToLabelMap[catId]}
                  </Tag>
                ))}
              </Tag.Group>
            </Read>
          </Columns.Column>
        </Columns>
      </Element>
    }
    <Element className="block-separator">
      <Columns>
        {mentor.gender && <Columns.Column>
          <Read title="personal details">
            <Content className="block-separator">
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
  </>
)
