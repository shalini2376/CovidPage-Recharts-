import './index.css'
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {vaccinationData} = props
  if (!Array.isArray(vaccinationData)) {
    return null
  }
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}K`
    }
    return `${(number * 1000).toString()}k`
  }

  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      <div className="barchart-container">
        <BarChart data={vaccinationData} width={1000} height={300}>
          <XAxis dataKey="vaccine_date" type="category" />
          <YAxis tickFormatter={dataFormatter} domain={[0, 'auto']} />
          <Legend />
          <Bar dataKey="dose_1" fill="#64c2a6" />
          <Bar dataKey="dose_2" fill="#f54394" />
        </BarChart>
      </div>
    </div>
  )
}

export default VaccinationCoverage
