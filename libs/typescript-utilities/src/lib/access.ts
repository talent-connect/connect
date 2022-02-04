
/** Returns teh typeof the values of a given object type */
export type Values<T extends object> = T[keyof T];