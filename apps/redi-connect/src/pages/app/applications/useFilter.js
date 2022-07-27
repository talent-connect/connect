export const useFilter = (applicants) => {
  const pendingApplications = applicants.filter(
    (applicant) => applicant.status === 'applied'
  )
  const hasPendingApplications = Boolean(pendingApplications.length)

  const hasAcceptedApplications = applicants.some(
    (applicant) =>
      applicant.status === 'accepted' || applicant.status === 'completed'
  )

  const hasDeclinedApplications = applicants.some(
    (applicant) => applicant.status === 'declined-by-mentor'
  )

  const hasCancelledApplications = applicants.some(
    (applicant) =>
      applicant.status === 'cancelled' ||
      applicant.status === 'invalidated-as-other-mentor-accepted'
  )

  return {
    pendingApplications,
    hasPendingApplications,
    hasAcceptedApplications,
    hasDeclinedApplications,
    hasCancelledApplications,
  }
}
