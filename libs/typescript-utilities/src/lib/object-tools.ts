
type ObjectType = { [s: string]: any }

/** */
export function objectEntries<T extends ObjectType> (obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj)
}

/** */
export function objectKeys<T extends ObjectType>(obj: T): (keyof T)[] {
  return Object.keys(obj)
}

/** */
export function objectValues<T extends ObjectType>(obj: T): [keyof T][] {
  return Object.values(obj)
}

/** */
export function mapOptions<T extends { id: string, label: string }> (options: T[]): { value: T['id'], label: T['label'] }[] {
  return options.map(({ id, label }) => ({ value: id, label }))
}

/** */
export function mapOptionsArray<T extends string> (options: (readonly T[]) | T[]): { value: T, label: T }[] {
  return options.map((value) => ({ value, label: value }))
}

/** */
export function mapOptionsObject<T extends ObjectType> (options: T): { value: keyof T, label: T[keyof T] }[] {
  return objectEntries(options).map(([value, label]) => ({ value, label }))
}