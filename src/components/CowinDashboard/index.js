import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstat = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: apiStatusConstat.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstat.inProgress,
    })
    try {
      const response = await fetch(
        'https://apis.ccbp.in/covid-vaccination-data',
      )
      const data = await response.json()
      const formattedData = {
        last7DaysData: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      if (response.ok) {
        this.setState({
          vaccinationData: formattedData,
          apiStatus: apiStatusConstat.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstat.failure,
        })
      }
    } catch (error) {
      console.log('Network error', error)
      this.setState({
        apiStatus: apiStatusConstat.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-view-container">
      <Loader type="ThreeDots" color="#000000" height={80} width={80} />
    </div>
  )

  renderChartsView = () => {
    const {vaccinationData} = this.state
    return (
      <div className="cowin-dashboard-container">
        <div className="logo-img-and-heading-div">
          <img
            className="logo-img"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          />
          <p className="tag-line-text">co-WIN</p>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        <VaccinationCoverage vaccinationData={vaccinationData.last7DaysData} />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge vaccinationByAge={vaccinationData.vaccinationByAge} />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstat.inProgress:
        return this.renderLoader()
      case apiStatusConstat.success:
        return this.renderChartsView()
      case apiStatusConstat.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default CowinDashboard
