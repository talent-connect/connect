import './Chip.scss'

export interface ChipProps {
  chip: string
}

const Chip = ({ chip }: ChipProps) => {
  return (
    <p key={chip} className="chip">
      {chip}
    </p>
  )
}
export default Chip
