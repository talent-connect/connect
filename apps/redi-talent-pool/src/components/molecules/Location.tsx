interface Props {
  institution: string
  city?: string
  country?: string
}

export const Location = ({ institution, city, country }: Props) => {
  let location
  if (city && country) {
    location = `${institution} (${city}, ${country})`
  } else if (city || country) {
    location = `${institution} (${city || country})`
  } else {
    location = institution
  }
  return <p style={{ color: '#979797' }}>{location}</p>
}
