import React, { FC } from 'react'
import { Subject } from 'rxjs'
import { useTpJobSeekerCvUpdateMutation } from '../../../react-query/use-tpjobSeekercv-mutation'
import { useTpJobSeekerCvByIdQuery } from '../../../react-query/use-tpjobSeekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'
import { JobSeekerFormSectionProfessionalExperience } from '../jobSeeker-profile-editables/EditableProfessionalExperience'

interface Props {
  tpJobSeekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export const AccordionFormCvProfessionalExperience: FC<Props> =({
  tpJobSeekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}) => {
  const queryHookResult = useTpJobSeekerCvByIdQuery(tpJobSeekerCvId)
  const mutationHookResult = useTpJobSeekerCvUpdateMutation(tpJobSeekerCvId)

  return (
    <AccordionForm
      title="Work experience"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobSeekerFormSectionProfessionalExperience
        setIsEditing={(isEditing) => {
          parentOnCloseCallback()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}
