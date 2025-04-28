import './index.css'
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  if (!Array.isArray(vaccinationByAge)) {
    return null
  }
  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-heading">Vaccination by Age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={-270}
          data={vaccinationByAge}
          dataKey="count"
        >
          <Cell name="18-45" fill="#2d87bb" />
          <Cell name="45-60" fill="#64c2a6" />
          <Cell name="Above 60" fill="#a3df9f" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByAge
