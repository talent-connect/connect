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
import { useTpjobseekerprofileUpdateMutation } from '../../react-query/use-tpjobseekerprofile-mutation'
import { useTpjobseekerprofileQuery } from '../../react-query/use-tpjobseekerprofile-query'
import { Editable } from '../molecules/Editable'

const formDesiredPositions = desiredPositions.map(({ id, label }) => ({
  value: id,
  label,
}))

const validationSchema = Yup.object({
  desiredPositions: Yup.array().max(
    3,
    'You can select up to three desired positions'
  ),
})

export function EditableOverview() {
  const { data: profile } = useTpjobseekerprofileQuery()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Editable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      title="Overview"
      readComponent={
        <>
          <Caption>Desired positions</Caption>
          <Tag.Group>
            {profile?.desiredPositions?.map((pos) => (
              <Tag key={pos}>{desiredPositionsIdToLabelMap[pos]}</Tag>
            ))}
          </Tag.Group>
        </>
      }
      modalTitle="Interests & About"
      modalHeadline="Overview"
      modalBody={<Form setIsEditing={setIsEditing} />}
    />
  )
}

function Form({ setIsEditing }: { setIsEditing: (boolean) => void }) {
  const { data: profile } = useTpjobseekerprofileQuery()
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
        label="Desired position"
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
