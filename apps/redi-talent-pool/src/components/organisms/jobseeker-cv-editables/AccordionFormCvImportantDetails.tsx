import { FC } from 'react'
import { Subject } from 'rxjs'
import { useTpJobSeekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobSeekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'
import { JobSeekerFormSectionImportantDetails } from '../jobseeker-profile-editables/EditableImportantDetails'

interface Props {
  tpJobSeekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export const AccordionFormCvImportantDetails: FC<Props> = ({
  tpJobSeekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}) => {
  const queryHookResult = useTpJobSeekerCvByIdQuery(tpJobSeekerCvId)
  const mutationHookResult = useTpJobSeekerCvUpdateMutation(tpJobSeekerCvId)

  return (
    <AccordionForm
      title="Contact"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobSeekerFormSectionImportantDetails
        hideNonContactDetailsFields
        setIsEditing={() => {
          parentOnCloseCallback()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}
