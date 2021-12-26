import * as moment from 'moment'

export function calculateAge (birthDate?: Date) {
  if (!birthDate) return '-'
  return moment().diff(birthDate, 'years')
}
