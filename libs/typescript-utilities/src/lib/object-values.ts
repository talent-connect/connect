export function objectValues<T>(obj: T): Array<T[keyof T]> {
  return Object.values(obj) as Array<T[keyof T]>
}
