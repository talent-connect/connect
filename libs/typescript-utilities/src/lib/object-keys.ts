export function objectKeys<T>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}
