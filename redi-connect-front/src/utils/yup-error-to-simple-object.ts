export type ErrorSimpleObject = { [key: string]: string };

export const yupErrorToSimpleObject = (error: any): ErrorSimpleObject => {
  const targetErrorsObject: ErrorSimpleObject = {};
  error.inner.forEach((error: any) => {
    const fieldName: string = error.path;
    const fieldError: string = error.message;
    targetErrorsObject[fieldName] = fieldError;
  });
  return targetErrorsObject;
};
