import { FC } from 'react'
import { Subject } from 'rxjs'
import { useTpjobseekerCvUpdateMutation } from '../../../react-query/use-tpjobseekercv-mutation'
import { useTpJobSeekerCvByIdQuery } from '../../../react-query/use-tpjobseekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'
import { JobSeekerFormSectionSummary } from '../jobseeker-profile-editables/EditableSummary'

interface Props {
  tpJobSeekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export const AccordionFormCvSummary: FC<Props> = ({
  tpJobSeekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}) => {
  const queryHookResult = useTpJobSeekerCvByIdQuery(tpJobSeekerCvId)
  const mutationHookResult = useTpjobseekerCvUpdateMutation(tpJobSeekerCvId)

  return (
    <AccordionForm
      title="About you and skills"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobSeekerFormSectionSummary
        setIsEditing={(isEditing) => {
          parentOnCloseCallback()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}
