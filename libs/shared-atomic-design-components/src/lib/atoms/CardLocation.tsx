import LocationIcon from '../../assets/images/location.svg'
import './CardLocation.scss'

const CardLocation = ({ location, remote }) => {
  const locationArr = location.split(',')
  const newLocationsString =
    locationArr.length > 3
      ? locationArr.slice(0, 3).join(',') + '...'
      : location

  return (
    <div className="card__location-container">
      <img src={LocationIcon} alt="Location" className="card__location-icon" />
      <p className="card__location-text">
        {newLocationsString}
        {remote ? ' | Remote' : ''}
      </p>
    </div>
  )
}

export default CardLocation
