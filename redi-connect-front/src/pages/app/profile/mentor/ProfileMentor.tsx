import React from 'react'
import { Heading } from '../../../../components/atoms'
import { PipeList, ReadAbout, Read } from '../../../../components/molecules'
import StaticAvatar from '../../../../components/organisms/StaticAvatar'
import { RedProfile } from '../../../../types/RedProfile'
import { categoriesIdToLabelMap } from '../../../../config/config'
import { Columns, Element, Content, Tag } from 'react-bulma-components'

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

    <Element className="block-separator">
      <ReadAbout.Some profile={mentor} />
    </Element>

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
