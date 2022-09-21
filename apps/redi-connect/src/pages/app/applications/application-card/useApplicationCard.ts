import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RedMatch, RedProfile } from '@talent-connect/shared-types'
import { getRedProfileFromLocalStorage } from '../../../../services/auth/auth'

interface ApplicationCardProps {
  application: RedMatch
  currentUser: RedProfile
}

export const useApplicationCard = ({
  application,
  currentUser,
}: ApplicationCardProps) => {
  const history = useHistory()
  const profile = getRedProfileFromLocalStorage()
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const applicationDate = new Date(application.createdAt || '')
  const applicationUser =
    profile.userType === 'mentee' ? application.mentor : application.mentee
  const currentUserIsMentor = currentUser?.userType === 'mentor'

  return {
    history,
    showDetails,
    setShowDetails,
    applicationUser,
    applicationDate,
    currentUserIsMentor,
  }
}
