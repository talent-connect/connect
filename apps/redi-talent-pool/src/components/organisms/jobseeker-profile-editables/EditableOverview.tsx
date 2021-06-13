import {
  Button,
  Caption,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { TpJobseekerProfile } from '@talent-connect/shared-types'
import {
  desiredPositions,
  desiredPositionsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Element, Tag } from 'react-bulma-components'
import * as Yup from 'yup'
import { useTpjobseekerprofileUpdateMutation } from '../../../react-query/use-tpjobseekerprofile-mutation'
import { useTpJobseekerProfileQuery } from '../../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
const formDesiredPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))

export function EditableOverview() {
  const { data: profile } = useTpJobseekerProfileQuery()
  const [isEditing, setIsEditing] = useState(false)

  const isEmpty = EditableOverview.isSectionEmpty(profile)

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      title="Overview"
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="slim"
            text="Add your preferred positions"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <>
            <Caption>Desired positions</Caption>
            <Tag.Group>
              {profile?.desiredPositions?.map((pos) => (
                <Tag key={pos}>{desiredPositionsIdToLabelMap[pos]}</Tag>
              ))}
            </Tag.Group>
          </>
        )
      }
      modalTitle="Interests & About"
      modalHeadline="Overview"
      modalBody={<ModalForm setIsEditing={setIsEditing} />}
    />
  )
}

EditableOverview.isSectionFilled = (profile: Partial<TpJobseekerProfile>) =>
  profile?.desiredPositions?.length > 0
EditableOverview.isSectionEmpty = (profile: Partial<TpJobseekerProfile>) =>
  !EditableOverview.isSectionFilled(profile)

const validationSchema = Yup.object({
  desiredPositions: Yup.array()
    .min(1, 'At least one desired position is required')
    .max(3, 'You can select up to three desired positions'),
})

function ModalForm({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpJobseekerProfileQuery()
  const mutation = useTpjobseekerprofileUpdateMutation()
  const initialValues: Partial<TpJobseekerProfile> = {
    desiredPositions: profile?.desiredPositions ?? [],
  }
  const onSubmit = (values: Partial<TpJobseekerProfile>) => {
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
    validationSchema,
    enableReinitialize: true,
    onSubmit,
    validateOnMount: true,
  })
  return (
    <>
      <Element
        renderAs="p"
        textSize={4}
        responsive={{ mobile: { textSize: { value: 5 } } }}
        className="oneandhalf-bs"
      >
        Let's hear a little bit about what kind of jobs you're interested in.
      </Element>
      <FormSelect
        label="Desired position* (pick 1-3)"
        name="desiredPositions"
        items={formDesiredPositions}
        {...formik}
        multiselect
      />
      <Button
        disabled={!formik.isValid || mutation.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
    </>
  )
}
