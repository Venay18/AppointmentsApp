// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachItem, isStarred} = props
  const {id, title, dateInput, isFavorite} = eachItem

  const onClickStar = () => {
    isStarred(id)
  }

  const imageUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list">
      <div className="star-container">
        <p className="name">{title}</p>
        <button
          type="button"
          className="star-btn"
          testid="star"
          onClick={onClickStar}
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
      <p className="date-display">Date :{dateInput}</p>
    </li>
  )
}

export default AppointmentItem
