import {
  Button,
  Caption,
  TextInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import { FC, useEffect, useMemo, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { useTpCompanyProfileQuery } from '../../../react-query/use-tpcompanyprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'

interface Props {
  profile: Partial<TpCompanyProfile>
  disableEditing?: boolean
}

interface EditableDetailsHelpers {
  isSectionFilled: (profile: Partial<TpCompanyProfile>) => boolean;
  isSectionEmpty: (profile: Partial<TpCompanyProfile>) => boolean;
  isWebsiteSectionFilled: (profile: Partial<TpCompanyProfile>) => boolean;
}

export const EditableDetails: FC<Props> & EditableDetailsHelpers = ({ profile, disableEditing }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableDetails.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      {...{ disableEditing, isEditing, isFormDirty, setIsEditing }}
      title="Details"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            onClick={() => setIsEditing(true)}
          >
            Add your website and industry details
          </EmptySectionPlaceholder>
        ) : (
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
              {profile?.industry && (
                <div>
                  <Caption>Industry</Caption>
                  <Content>
                    <p>{profile.industry}</p>
                  </Content>
                </div>
              )}

              {(profile?.website || profile?.linkedInUrl) && (
                <div>
                  <Caption>Links</Caption>
                  <Content>
                    {[profile?.website, profile?.linkedInUrl]
                      .filter((l) => l)
                      .map((link, idx) => (
                        <p key={idx}>
                          <a href={link} target="_blank" rel="noreferrer">
                            {link.replace(/http(s)?:\/\//g, '')}
                          </a>
                        </p>
                      ))}
                  </Content>
                </div>
              )}
            </div>
          </div>
        )
      }
      modalTitle="Help jobseekers get in touch"
      modalHeadline="Important Details"
      modalBody={
        <ModalForm
          setIsEditing={setIsEditing}
          setIsFormDirty={setIsFormDirty}
        />
      }
      modalStyles={{ minHeight: '40rem' }}
    />
  )
}

EditableDetails.isWebsiteSectionFilled = ({ website }: Partial<TpCompanyProfile>) =>
  !!website

EditableDetails.isSectionFilled = ({ website, industry, linkedInUrl }: Partial<TpCompanyProfile>) =>
  !!industry || !!website || !!linkedInUrl

EditableDetails.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableDetails.isSectionFilled(profile)

interface ModalFormProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty: (boolean: boolean) => void
}

const ModalForm: FC<ModalFormProps> = ({
  setIsEditing,
  setIsFormDirty,
}) => {
  const { data: profile } = useTpCompanyProfileQuery()
  const mutation = useTpCompanyProfileUpdateMutation()

  const initialValues = useMemo(() => ({
      industry: profile?.industry ?? '',
      website: profile?.website ?? '',
      linkedInUrl: profile?.linkedInUrl ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const formik = useFormik<Partial<TpCompanyProfile>>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      mutation.mutate(values, {
        onSettled: () => setSubmitting(false),
        onSuccess: () => setIsEditing(false),
      })
    },
  })

  useEffect(() => setIsFormDirty(formik.dirty), [formik.dirty, setIsFormDirty])

  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        This is where employers can get the basics that they need to get in
        touch and see your work.
      </Element>
      <TextInput
        name="industry"
        placeholder="Company Software"
        label="Industry"
        {...formik}
      />
      <TextInput
        name="website"
        placeholder="https://www.company.de"
        label="Website *"
        {...formik}
      />
      <TextInput
        name="linkedInUrl"
        placeholder="https://www.linkedin.com/company-page"
        label="LinkedIn Page"
        {...formik}
      />

      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutation.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}
