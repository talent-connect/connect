export const toPascalCaseAndTrim = (str: string) => {
  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
