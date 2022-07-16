// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    dateInput: '',
    appointmentsList: [],
    isStarred: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, dateInput} = this.state
    const formatdate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const appointment = {
      id: uuidv4(),
      title,
      dateInput: formatdate,
      isFavorite: false,
    }
    this.setState(previousState => ({
      appointmentsList: [...previousState.appointmentsList, appointment],
      title: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    event.preventDefault()
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    event.preventDefault()
    this.setState({dateInput: event.target.value})
  }

  starredList = () => {
    const {isStarred} = this.state
    this.setState({isStarred: !isStarred})
  }

  onClickFavorite = id => {
    this.setState(previousState => ({
      appointmentsList: previousState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  getFilteredLists = () => {
    const {isStarred, appointmentsList} = this.state
    if (isStarred) {
      return appointmentsList.filter(each => each.isFavorite === true)
    }
    return appointmentsList
  }

  render() {
    const {title, dateInput} = this.state
    const filteredAppointmentsList = this.getFilteredLists()

    return (
      <div className="app-container">
        <div className="response-container">
          <div className="appointment-container">
            <div className="add-appointment">
              <form className="form" onSubmit={this.addAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="label" htmlFor="titleInput">
                  TITLE
                </label>
                <input
                  className="input"
                  id="titleInput"
                  type="text"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={title}
                />
                <label className="label" htmlFor="dateinput">
                  DATE
                </label>
                <input
                  className="input"
                  type="date"
                  id="dateinput"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />

                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>

              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
            <hr className="line" />
            <div className="filter-container">
              <h1 className="appointment-name">Appointments</h1>

              <button
                type="button"
                className="starred-btn"
                onClick={this.starredList}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(each => (
                <AppointmentItem
                  eachItem={each}
                  key={each.id}
                  isStarred={this.onClickFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
