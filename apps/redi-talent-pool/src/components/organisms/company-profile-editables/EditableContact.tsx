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

interface EditableContactHelpers {
  isSectionFilled: (profile: Partial<TpCompanyProfile>) => boolean;
  isSectionEmpty: (profile: Partial<TpCompanyProfile>) => boolean;
}

export const EditableContact: FC<Props> & EditableContactHelpers = ({
  profile,
  disableEditing
}) => {
  const { firstName, lastName, phoneNumber, contactEmail } = profile

  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableContact.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      disableEditing={disableEditing}
      isEditing={isEditing}
      isFormDirty={isFormDirty}
      setIsEditing={setIsEditing}
      title="Contact"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="tall"
            onClick={() => setIsEditing(true)}
          >
            Add your contact details
          </EmptySectionPlaceholder>
        ) : (
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gridColumnGap: '32px',
              gridRowGap: '32px',
            }}
          >
            {(firstName || lastName) && (
              <div>
                <Caption>Name</Caption>
                <Content>
                  <p>{firstName} {lastName}</p>
                </Content>
              </div>
            )}
            {phoneNumber && (
              <div>
                <Caption>Phone</Caption>
                <Content>
                  <p>{phoneNumber}</p>
                </Content>
              </div>
            )}
            {contactEmail && (
              <div>
                <Caption>Email</Caption>
                <Content>
                  <p>{contactEmail}</p>
                </Content>
              </div>
            )}
          </div>
        )
      }
      modalTitle="Help applicants get in touch"
      modalHeadline="Contact"
      modalBody={
        <ModalForm
          {...{ setIsEditing, setIsFormDirty }}
        />
      }
      modalStyles={{ minHeight: '40rem' }}
    />
  )
}

EditableContact.isSectionFilled = (profile: Partial<TpCompanyProfile>) =>
  !!profile?.firstName ||
  !!profile?.lastName ||
  !!profile?.contactEmail ||
  !!profile?.phoneNumber

EditableContact.isSectionEmpty = (profile: Partial<TpCompanyProfile>) =>
  !EditableContact.isSectionFilled(profile)

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
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      contactEmail: profile?.contactEmail || '',
      phoneNumber: profile?.phoneNumber || '',
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
        Let ReDI JobSeekers know how to get in touch.
      </Element>
      <TextInput
        name="firstName"
        placeholder="Erika"
        label="First name"
        {...formik}
      />
      <TextInput
        name="lastName"
        placeholder="Mustermann"
        label="Last name"
        {...formik}
      />
      <TextInput
        name="contactEmail"
        placeholder="your.name@company.com"
        label="Email"
        {...formik}
      />
      <TextInput
        name="phoneNumber"
        placeholder="0176 01234567"
        label="Phone Number"
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
