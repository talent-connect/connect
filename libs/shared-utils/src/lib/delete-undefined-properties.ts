export function deleteUndefinedProperties<T extends object>(obj: T): T {
  const returnObject = {}
  for (const key in obj) {
    if (obj[key] !== undefined) {
      Object.assign(returnObject, { [key]: obj[key] })
    }
  }
  return returnObject as T
}
