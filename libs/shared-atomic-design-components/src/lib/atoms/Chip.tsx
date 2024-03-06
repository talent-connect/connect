import './Chip.scss'

const Chip = ({ chip }) => {
  return (
    <p key={chip} className="chip">
      {chip}
    </p>
  )
}
export default Chip
