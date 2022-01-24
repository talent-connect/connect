
import * as moment from 'moment'


/** */
export function formatDate (month?: number, year?: number): string { // TODO: rethink
  if (year && !month) return String(year)
  if (year && month) return moment().month(month).year(year).format('MMMM YYYY')
  if (!year && month) return moment().month(month).format('MMMM')
  return ''
}