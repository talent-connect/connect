
import * as moment from 'moment'


/** */
export function formatDate (month?: number, year?: number): string { // TODO: rethink 
  if (month) return year
    ? moment().month(month).format('MMMM')
    : moment().month(month).year(year).format('MMMM YYYY')
  if (year) return String(year)
  return ''
}

/** */
export function calculateAge (birthDate?: Date): number | '-' {
  if (!birthDate) return '-'
  return moment().diff(birthDate, 'years')
}