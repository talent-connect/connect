import { useMyTpDataQuery } from '@talent-connect/data-access'
import {
  Button,
  Caption,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { EditableDetailsCompanyProfilePropFragment } from './EditableDetails.generated'

interface Props {
  companyProfile: EditableDetailsCompanyProfilePropFragment
  disableEditing?: boolean
}

export function EditableDetails({ companyProfile, disableEditing }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableDetails.isSectionEmpty(companyProfile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
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
              {companyProfile?.industry ? (
                <div>
                  <Caption>Industry</Caption>
                  <Content>
                    <p>{companyProfile.industry}</p>
                  </Content>
                </div>
              ) : null}

              {companyProfile?.website || companyProfile?.linkedInUrl ? (
                <div>
                  <Caption>Links</Caption>
                  <Content>
                    {[companyProfile?.website, companyProfile?.linkedInUrl]
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
              ) : null}
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

EditableDetails.isWebsiteSectionFilled = (
  companyProfile: EditableDetailsCompanyProfilePropFragment
) => companyProfile?.website
EditableDetails.isSectionFilled = (
  companyProfile: EditableDetailsCompanyProfilePropFragment
) =>
  companyProfile?.industry ||
  companyProfile?.website ||
  companyProfile?.linkedInUrl
EditableDetails.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableDetails.isSectionFilled(profile)

function ModalForm({
  setIsEditing,
  setIsFormDirty,
}: {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}) {
  const myData = useMyTpDataQuery()
  const { representedCompany: companyProfile } =
    myData?.data?.tpCurrentUserDataGet
  const mutation = useTpCompanyProfileUpdateMutation()

  const initialValues: Partial<TpCompanyProfile> = useMemo(
    () => ({
      industry: companyProfile?.industry ?? '',
      website: companyProfile?.website ?? '',
      linkedInUrl: companyProfile?.linkedInUrl ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const onSubmit = (values: Partial<TpCompanyProfile>) => {
    formik.setSubmitting(true)
    mutation.mutate(values, {
      onSettled: () => {
        formik.setSubmitting(false)
      },
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
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
      <FormInput
        name="industry"
        placeholder="Company Software"
        label="Industry"
        {...formik}
      />
      <FormInput
        name="website"
        placeholder="https://www.company.de"
        label="Website *"
        {...formik}
      />
      <FormInput
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
