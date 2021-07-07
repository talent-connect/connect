import React from 'react'
import { Subject } from 'rxjs'
import { useTpjobseekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobseekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'
import { JobseekerFormSectionOverview } from '../jobseeker-profile-editables/EditableOverview'

interface Props {
  tpJobseekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export function AccordionFormCvDesiredPositions({
  tpJobseekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}: Props) {
  const onClose = () => {
    parentOnCloseCallback()
  }

  const queryHookResult = useTpJobseekerCvByIdQuery(tpJobseekerCvId)
  const mutationHookResult = useTpjobseekerCvUpdateMutation(tpJobseekerCvId)

  return (
    <AccordionForm
      title="Desired positions"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobseekerFormSectionOverview
        hideCurrentRediCourseField
        setIsEditing={(isEditing) => {
          onClose()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}