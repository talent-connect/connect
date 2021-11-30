export const locationDetails = (
  company: string,
  city: string,
  country: string
): string => {
  if (company && city && country) return `${company} (${city}, ${country})`
  if (company && (city || country))
    return `${company} (${city ? city : country})`
  if (city && country) return [city, country].join(', ')
  if (company) return company
  if (city) return city
  if (country) return country
  return null
}
