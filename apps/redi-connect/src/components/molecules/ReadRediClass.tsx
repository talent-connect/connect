// COMMENTED EVERYTHING OUT, UNTIL WE REFACTOR THIS COMPONENT USING DATA
// FROM SALESFORCE TO DISPLAY WHICH REDI COURSE A STUDENT IS TAKING.

// interface Props {
//   profile: ReadRediClassProfilePropFragment
//   shortInfo?: boolean
// }

// const ReadRediClass = ({ profile, shortInfo }: Props) => {
//   const { mentee_currentlyEnrolledInCourse } = profile

//   const COURSES_MAP = Object.fromEntries(
//     COURSES.map((course) => [course.id, course.label])
//   )

//   return (
//     <>
//       {shortInfo && <Caption>Redi Class</Caption>}
//       <Content>
//         {mentee_currentlyEnrolledInCourse && (
//           <p>{COURSES_MAP[mentee_currentlyEnrolledInCourse]}</p>
//         )}
//       </Content>
//     </>
//   )
// }

// export default {
//   Me: () => {
//     const loopbackUserId = getAccessTokenFromLocalStorage().userId
//     const myProfileQuery = useLoadMyProfileQuery({ loopbackUserId })

//     if (!myProfileQuery.isSuccess) return null

//     return <ReadRediClass profile={myProfileQuery.data.conProfile} />
//   },
//   Some: ({ profile }: Props) => <ReadRediClass profile={profile} shortInfo />,
// }

export default {
  Me: () => null,
  Some: ({ profile }: any) => null,
}
