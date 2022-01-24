export type ErrorSimpleObject = { [key: string]: string }

// TODO: repeated
export const yupErrorToSimpleObject = (error: any): ErrorSimpleObject => {
  const targetErrorsObject: ErrorSimpleObject = {}
  error.inner.forEach((error) => {
    const fieldName: string = error.path
    const fieldError: string = error.message
    targetErrorsObject[fieldName] = fieldError
  })
  return targetErrorsObject
}
