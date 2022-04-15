// Got this from: https://stackoverflow.com/questions/39392853/is-there-a-type-for-class-in-typescript-and-does-any-include-it
export interface Class<T> extends Function {
  new (...args: any[]): T
}
