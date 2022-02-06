import {
  Button,
  Caption,
  FormSelect,
} from '@talent-connect/shared-atomic-design-components'
import { COURSES, REDI_LOCATION_NAMES } from '@talent-connect/shared-config'
import { TpJobSeekerCv, TpJobSeekerProfile } from '@talent-connect/shared-types'
import {
  desiredPositions,
  desiredPositionsIdToLabelMap,
} from '@talent-connect/talent-pool/config'
import { mapOptions } from '@talent-connect/typescript-utilities';
import { useFormik } from 'formik'
import { FC, useEffect, useMemo, useState } from 'react'
import { Element, Tag } from 'react-bulma-components'
import { UseMutationResult, UseQueryResult } from 'react-query'
import * as Yup from 'yup'
import { useTpJobSeekerProfileUpdateMutation } from '../../../react-query/use-tpjobSeekerprofile-mutation'
import { useTpJobSeekerProfileQuery } from '../../../react-query/use-tpjobSeekerprofile-query'
import { Editable } from '../../molecules/Editable'
import { EmptySectionPlaceholder } from '../../molecules/EmptySectionPlaceholder'
import { componentForm } from './EditableOverview.from';

interface Props {
  profile?: Partial<TpJobSeekerProfile>
  disableEditing?: boolean
}

interface EditableOverviewHelpers {
  isSectionFilled: (profile: Partial<TpJobSeekerProfile>) => boolean;
  isSectionEmpty: (profile: Partial<TpJobSeekerProfile>) => boolean;
}

export const EditableOverview: FC<Props> & EditableOverviewHelpers = ({
  profile: overridingProfile,
  disableEditing,
}) => {
  const queryHookResult = useTpJobSeekerProfileQuery({
    enabled: !disableEditing,
  })
  if (overridingProfile) queryHookResult.data = overridingProfile
  const mutationHookResult = useTpJobSeekerProfileUpdateMutation()
  const { data: profile } = queryHookResult
  const [isEditing, setIsEditing] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const isEmpty = EditableOverview.isSectionEmpty(profile)

  if (disableEditing && isEmpty) return null

  return (
    <Editable
      title="Overview"
      modalTitle="Interests & About"
      modalHeadline="Overview"
      {...{ disableEditing, isEditing, isFormDirty, setIsEditing }}
      readComponent={
        isEmpty ? (
          <EmptySectionPlaceholder
            height="slim"
            onClick={() => setIsEditing(true)}
          >
            Add your preferred positions
          </EmptySectionPlaceholder>
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
      modalBody={
        <JobSeekerFormSectionOverview
          {...{ setIsEditing, queryHookResult, mutationHookResult, setIsFormDirty }}
        />
      }
    />
  )
}

EditableOverview.isSectionFilled = (profile: Partial<TpJobSeekerProfile>) =>
  !!profile?.desiredPositions?.length

EditableOverview.isSectionEmpty = (profile: Partial<TpJobSeekerProfile>) =>
  !EditableOverview.isSectionFilled(profile)

// ###########################################################################
  
const validationSchema = Yup.object({
  desiredPositions: Yup.array()
    .min(1, 'At least one desired position is required')
    .max(3, 'You can select up to three desired positions'),
})

interface JobSeekerFormSectionOverviewProps {
  setIsEditing: (boolean: boolean) => void
  setIsFormDirty?: (boolean: boolean) => void
  queryHookResult: UseQueryResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
  mutationHookResult: UseMutationResult<
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown,
    Partial<TpJobSeekerProfile | TpJobSeekerCv>,
    unknown
  >
  hideCurrentRediCourseField?: boolean
}

export const JobSeekerFormSectionOverview: FC<JobSeekerFormSectionOverviewProps> = ({
  setIsEditing,
  setIsFormDirty,
  queryHookResult: { data: profile },
  mutationHookResult,
  hideCurrentRediCourseField,
}) => {
  // const initialValues = useMemo(() => ({
  //     desiredPositions: profile?.desiredPositions ?? [],
  //     currentlyEnrolledInCourse: profile?.currentlyEnrolledInCourse ?? '',
  //   }),
  //   [profile?.currentlyEnrolledInCourse, profile?.desiredPositions]
  // )

  const formik = componentForm({
    mutationHookResult,
    profile,
    setIsEditing
  }) 

  useEffect(
    () => setIsFormDirty?.(formik.dirty),
    [formik.dirty, setIsFormDirty]
  )

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
        multiSelect
      />
      {hideCurrentRediCourseField ? null : (
        <FormSelect
          label="Current ReDI course"
          name="currentlyEnrolledInCourse"
          items={formCourses}
          {...formik}
        />
      )}
      <Button
        disabled={!formik.isValid || mutationHookResult.isLoading}
        onClick={formik.submitForm}
      >
        Save
      </Button>
      <Button
        simple
        disabled={mutationHookResult.isLoading}
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </Button>
    </>
  )
}

const formDesiredPositions = mapOptions(desiredPositions)

// TODO: merge this logic with the stuff in SignUp.tsx
const coursesWithAlumniDeduped = [
  ...COURSES.filter((c) =>  !c.id.includes('alumni')),
  {
    id: 'alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'berlin',
  },
]

const formCourses = coursesWithAlumniDeduped.map(({ id, label, location }) => ({
    value: id,
    label: id === 'alumni'
      ? label
      : `(ReDI ${REDI_LOCATION_NAMES[location]}) ${label}`,
  }))
