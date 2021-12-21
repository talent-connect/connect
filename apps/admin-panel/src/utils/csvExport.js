import { downloadCSV } from 'react-admin'
import { unparse as convertToCSV } from 'papaparse/papaparse.min'

export const redMatchesCsvExporter = async (redMatches) => {
  const data = redMatches.map((redMatch) => ({
    status: redMatch.status,
    applicationText: redMatch.applicationText,
    expectationText: redMatch.expectationText,
    rediLocation: redMatch.rediLocation,
    mentorName: `${redMatch.mentor?.firstName} ${redMatch.mentor?.lastName}`,
    mentorContactEmail: redMatch.mentor?.contactEmail,
    menteeName: `${redMatch.mentee?.firstName} ${redMatch.mentee?.lastName}`,
    menteeContactEmail: redMatch.mentee?.contactEmail,
    matchCompletedOn: redMatch.matchCompletedOn,
  }))

  const csv = convertToCSV({
    data,
  })

  downloadCSV(csv, 'ReDI Mentorship Matches')
}
