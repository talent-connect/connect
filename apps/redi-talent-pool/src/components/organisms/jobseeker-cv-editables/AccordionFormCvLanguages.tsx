import React, { FC } from 'react'
import { Subject } from 'rxjs'
import { useTpjobseekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobSeekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'
import { JobSeekerFormSectionLanguages } from '../jobseeker-profile-editables/EditableLanguages'

interface Props {
  tpJobSeekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export const  AccordionFormCvLanguages: FC<Props> = ({
  tpJobSeekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}) => {

  const queryHookResult = useTpJobSeekerCvByIdQuery(tpJobSeekerCvId)
  const mutationHookResult = useTpjobseekerCvUpdateMutation(tpJobSeekerCvId)

  return (
    <AccordionForm
      title="Languages"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobSeekerFormSectionLanguages
        setIsEditing={(isEditing) => {
          parentOnCloseCallback()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}
