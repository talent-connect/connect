import './Chip.scss'

export interface ChipProps {
  chip: string
}

const Chip = ({ chip }: ChipProps) => {
  return <p className="chip">{chip}</p>
}
export default Chip
