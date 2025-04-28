import './index.css'
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props
  if (!Array.isArray(vaccinationByGenderData)) {
    return null
  }
  return (
    <div className="vaccination-by-gender-div">
      <h1 className="vaccination-by-gender-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationByGenderData}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          dataKey="count"
          innerRadius="40%"
          outerRadius="70%"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
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
export default VaccinationByGender
