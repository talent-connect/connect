import {
  Caption,
  Heading,
  Icon,
} from '@talent-connect/shared-atomic-design-components'
import {
  employmentTypesIdToLabelMap,
  topSkillsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import moment from 'moment'
import { Columns, Content, Element, Tag } from 'react-bulma-components'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import Avatar from '../../../components/organisms/Avatar'
import { EditableContact } from '../../../components/organisms/company-profile-editables/EditableContact'
import { EditableDetails } from '../../../components/organisms/company-profile-editables/EditableDetails'
import { LoggedIn } from '../../../components/templates'
import { useTpJobListingOneQuery } from '../../../react-query/use-tpjoblisting-one-query'

export function JobListing() {
  const { tpJobListingId }: { tpJobListingId: string } = useParams()
  const { data: jobListing } = useTpJobListingOneQuery(tpJobListingId)

  return (
    <LoggedIn>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '15rem' }}>
          {jobListing ? (
            <Avatar profile={jobListing.tpCompanyProfile} shape="square" />
          ) : null}
        </div>
        <div
          style={{
            marginLeft: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Heading size="medium">{jobListing?.title}</Heading>
          <Element
            renderAs="p"
            textSize={4}
            responsive={{ mobile: { textSize: { value: 5 } } }}
            className="oneandhalf-bs"
          >
            at {jobListing?.tpCompanyProfile?.companyName}
          </Element>
          <Caption>
            Posted {moment(jobListing?.createdAt).format('DD.MM.YYYY')}
          </Caption>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {jobListing?.location ? (
              <div style={{ display: 'flex', marginBottom: '4px' }}>
                <Icon icon="mapPin" />{' '}
                <Content>
                  <strong>{jobListing?.location}</strong>
                </Content>
              </div>
            ) : null}
            {jobListing?.isRemotePossible ? (
              <div style={{ display: 'flex' }}>
                <Icon icon="mapPin" />{' '}
                <Content>
                  <strong>Remote working possible</strong>
                </Content>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <div className="profile-section">
            <div className="profile-section--title is-flex is-flex-direction-row">
              <Element
                renderAs="h4"
                textSize={4}
                responsive={{ mobile: { textSize: { value: 7 } } }}
                className="is-flex-grow-1"
                style={{ flexGrow: 1 }}
              >
                About the Role
              </Element>
            </div>

            <div className="profile-section--body">
              <ReactMarkdown>{jobListing?.summary}</ReactMarkdown>
            </div>
          </div>
          <div className="profile-section">
            <div className="profile-section--title is-flex is-flex-direction-row">
              <Element
                renderAs="h4"
                textSize={4}
                responsive={{ mobile: { textSize: { value: 7 } } }}
                className="is-flex-grow-1"
                style={{ flexGrow: 1 }}
              >
                Ideal technical skills
              </Element>
            </div>

            <div className="profile-section--body">
              {jobListing?.idealTechnicalSkills?.length > 0 ? (
                <Tag.Group>
                  {jobListing.idealTechnicalSkills.map((skill) => (
                    <Tag key={skill}>{topSkillsIdToLabelMap[skill]}</Tag>
                  ))}
                </Tag.Group>
              ) : (
                'N/A'
              )}
            </div>
          </div>
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <div className="profile-section">
            <div className="profile-section--title is-flex is-flex-direction-row">
              <Element
                renderAs="h4"
                textSize={4}
                responsive={{ mobile: { textSize: { value: 7 } } }}
                className="is-flex-grow-1"
                style={{ flexGrow: 1 }}
              >
                Important Details
              </Element>
            </div>

            <div className="profile-section--body">
              <div
                style={{
                  display: 'grid',
                  width: '100%',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gridColumnGap: '32px',
                  gridRowGap: '32px',
                }}
              >
                <div>
                  <Caption>Employment type</Caption>
                  <Content>
                    {jobListing?.employmentType
                      ? employmentTypesIdToLabelMap[jobListing.employmentType]
                      : 'N/A'}
                  </Content>
                </div>

                <div>
                  <Caption>Language requirements</Caption>
                  <Content>
                    {jobListing?.languageRequirements
                      ? jobListing.languageRequirements
                      : 'N/A'}
                  </Content>
                </div>

                <div>
                  <Caption>Salary range</Caption>
                  <Content>
                    {jobListing?.salaryRange ? jobListing.salaryRange : 'N/A'}
                  </Content>
                </div>
              </div>
            </div>
          </div>
        </Columns.Column>
      </Columns>
      <Columns className="is-6 is-variable">
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'three-fifths' }}>
          <div className="profile-section">
            <div className="profile-section--title is-flex is-flex-direction-row">
              <Element
                renderAs="h4"
                textSize={4}
                responsive={{ mobile: { textSize: { value: 7 } } }}
                className="is-flex-grow-1"
                style={{ flexGrow: 1 }}
              >
                About the Company
              </Element>
            </div>

            <div className="profile-section--body">
              <ReactMarkdown>
                {jobListing?.tpCompanyProfile?.about}
              </ReactMarkdown>
            </div>
          </div>
        </Columns.Column>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 'two-fifths' }}>
          <EditableDetails
            profile={jobListing?.tpCompanyProfile}
            disableEditing
          />
          <EditableContact
            profile={jobListing?.tpCompanyProfile}
            disableEditing
          />
        </Columns.Column>
      </Columns>
    </LoggedIn>
  )
}

export default JobListing
