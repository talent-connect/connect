export const getInstitutionAndLocationString = (
  institution: string,
  city?: string,
  country?: string
): string => {
  if (city && country) return `${institution} (${city}, ${country})`
  if (city || country) return `${institution} (${city || country})`
  return institution;
}
