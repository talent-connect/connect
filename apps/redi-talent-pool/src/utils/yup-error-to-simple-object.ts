export type ErrorSimpleObject = { [key: string]: string }

export const yupErrorToSimpleObject = (error: any): ErrorSimpleObject => {
  const targetErrorsObject: ErrorSimpleObject = {}
  error.inner.forEach((error) => {
    const fieldName = error.path
    const fieldError = error.message
    targetErrorsObject[fieldName] = fieldError
  })
  return targetErrorsObject
}
