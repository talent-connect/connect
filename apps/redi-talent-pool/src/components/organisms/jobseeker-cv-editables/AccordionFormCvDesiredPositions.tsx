import { FC } from 'react'
import { Subject } from 'rxjs'
import { useTpJobSeekerCvUpdateMutation } from '../../../react-query/use-tpjobSeekercv-mutation'
import { useTpJobSeekerCvByIdQuery } from '../../../react-query/use-tpjobSeekercv-query'
import { AccordionForm } from '../../molecules/AccordionForm'
import { JobSeekerFormSectionOverview } from '../jobSeeker-profile-editables/EditableOverview'

interface Props {
  tpJobSeekerCvId: string
  onClose: () => void
  closeAccordionSignalSubject?: Subject<void>
}

export const AccordionFormCvDesiredPositions: FC<Props> = ({
  tpJobSeekerCvId,
  closeAccordionSignalSubject,
  onClose: parentOnCloseCallback,
}) => {

  const queryHookResult = useTpJobSeekerCvByIdQuery(tpJobSeekerCvId)
  const mutationHookResult = useTpJobSeekerCvUpdateMutation(tpJobSeekerCvId)

  return (
    <AccordionForm
      title="Desired positions"
      closeAccordionSignalSubject={closeAccordionSignalSubject}
    >
      <JobSeekerFormSectionOverview
        hideCurrentRediCourseField
        setIsEditing={(isEditing) => {
          parentOnCloseCallback()
        }}
        queryHookResult={queryHookResult}
        mutationHookResult={mutationHookResult}
      />
    </AccordionForm>
  )
}
