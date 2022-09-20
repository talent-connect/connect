export const useApplicationCard = (
  useHistory,
  getRedProfileFromLocalStorage,
  useState,
  application,
  currentUser
) => {
  const history = useHistory()
  const profile = getRedProfileFromLocalStorage()
  const [showDetails, setShowDetails] = useState(false)
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
