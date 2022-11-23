import { RedProfile } from '@talent-connect/shared-types'

export function toggleValueInArray<T>(array: Array<T>, value: T) {
  if (array.includes(value)) return array.filter((val) => val !== value)
  else return [...array, value]
}

// Fix for newly registered mentee users:
// Ensuring that a mentee filled their profile with required information before displaying list of mentors
const isString = (value: any) => typeof value === 'string'
const isFulfilledString = (string: any) => isString(string) && string.length > 0

const arrayIsNotEmpty = (array: any) => Array.isArray(array) && array.length > 0
const isObjectValueFulfilled = (objectValue: any) => arrayIsNotEmpty(objectValue) || isFulfilledString(objectValue)

export const ensureMenteeProfileIsComplete = ({ mentee_mentoringGoal, mentee_primaryRole_fieldOfExpertise }: RedProfile) => {
  const isMenteeProfileComplete = isObjectValueFulfilled(mentee_mentoringGoal) && isObjectValueFulfilled(mentee_primaryRole_fieldOfExpertise)
  return isMenteeProfileComplete
}
