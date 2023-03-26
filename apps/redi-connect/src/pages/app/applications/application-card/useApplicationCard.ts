import {
  AllConProfileFieldsFragment,
  UserType,
} from '@talent-connect/data-access'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ApplicationCardApplicationPropFragment } from '../../../../components/organisms/ApplicationCard.generated'

interface ApplicationCardProps {
  application: ApplicationCardApplicationPropFragment
  currentUser: AllConProfileFieldsFragment
}

export const useApplicationCard = ({
  application,
  currentUser,
}: ApplicationCardProps) => {
  const history = useHistory()
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const applicationDate = new Date(application.createdAt || '')
  const applicationUser =
    currentUser.userType === UserType.Mentee
      ? application.mentor
      : application.mentee
  const currentUserIsMentor = currentUser?.userType === UserType.Mentor

  return {
    history,
    showDetails,
    setShowDetails,
    applicationUser,
    applicationDate,
    currentUserIsMentor,
  }
}
