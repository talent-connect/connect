import { useMyTpDataQuery } from '@talent-connect/data-access'
import {
  Button,
  Caption,
  FormInput,
} from '@talent-connect/shared-atomic-design-components'
import { TpCompanyProfile } from '@talent-connect/shared-types'
import { toPascalCaseAndTrim } from '@talent-connect/shared-utils'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { Content, Element } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpCompanyProfileUpdateMutation } from '../../../react-query/use-tpcompanyprofile-mutation'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import {
  EditableContactCompanyProfilePropFragment,
  EditableContactUserContactPropFragment,
} from './EditableContact.generated'

interface Props {
  companyProfile: EditableContactCompanyProfilePropFragment
  userContact: EditableContactUserContactPropFragment
  disableEditing?: boolean
}

export function EditableContact({
  companyProfile,
  userContact,
  disableEditing,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableContact.isSectionEmpty(companyProfile, userContact)

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
            {userContact?.firstName || userContact?.lastName ? (
              <div>
                <Caption>Name</Caption>
                <Content>
                  <p>
                    {userContact?.firstName} {userContact?.lastName}
                  </p>
                </Content>
              </div>
            ) : null}
            {companyProfile.phoneNumber ? (
              <div>
                <Caption>Phone</Caption>
                <Content>
                  <p>{companyProfile?.phoneNumber}</p>
                </Content>
              </div>
            ) : null}
            {userContact.email ? (
              <div>
                <Caption>E-mail</Caption>
                <Content>
                  <p>{userContact.email}</p>
                </Content>
              </div>
            ) : null}
          </div>
        )
      }
      modalTitle="Help applicants get in touch"
      modalHeadline="Contact"
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

EditableContact.isSectionFilled = (
  companyProfile: EditableContactCompanyProfilePropFragment,
  userContact: EditableContactUserContactPropFragment
) =>
  userContact?.firstName ||
  userContact?.lastName ||
  userContact?.email ||
  companyProfile?.phoneNumber
EditableContact.isSectionEmpty = (
  companyProfile: EditableContactCompanyProfilePropFragment,
  userContact: EditableContactUserContactPropFragment
) => !EditableContact.isSectionFilled(companyProfile, userContact)

const validationSchema = Yup.object({
  firstName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your first name is required')
    .max(255),
  lastName: Yup.string()
    .transform(toPascalCaseAndTrim)
    .required('Your last name is required')
    .max(255),
  contactEmail: Yup.string().email().required().label('E-mail'),
  phoneNumber: Yup.string().max(255).label('Phone Number'),
})

function ModalForm({
  setIsEditing,
  setIsFormDirty,
}: {
  setIsEditing: (boolean) => void
  setIsFormDirty: (boolean) => void
}) {
  const myData = useMyTpDataQuery()
  const { userContact, representedCompany: companyProfile } =
    myData?.data?.tpCurrentUserDataGet

  const mutation = useTpCompanyProfileUpdateMutation()
  const initialValues: EditableContactCompanyProfilePropFragment &
    EditableContactUserContactPropFragment = useMemo(
    () => ({
      firstName: userContact?.firstName ?? '',
      lastName: userContact?.lastName ?? '',
      email: userContact?.email ?? '',
      phoneNumber: companyProfile?.phoneNumber ?? '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const onSubmit = (values: Partial<TpCompanyProfile>) => {
    formik.setSubmitting(true)
    const transformedValues = validationSchema.cast(values)
    mutation.mutate(transformedValues, {
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
    validationSchema,
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
        Let ReDI Jobseekers know how to get in touch.
      </Element>
      <FormInput
        name="firstName"
        placeholder="Erika"
        label="First name*"
        {...formik}
      />
      <FormInput
        name="lastName"
        placeholder="Mustermann"
        label="Last name*"
        {...formik}
      />
      <FormInput
        name="contactEmail"
        placeholder="your.name@company.com"
        label="E-mail*"
        {...formik}
      />
      <FormInput
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
