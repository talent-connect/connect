import * as moment from 'moment'

export function calculateAge(birthDate) {
  const age = moment().diff(birthDate, 'years')
  if (!birthDate) {
    return '-'
  }
  return age
}
