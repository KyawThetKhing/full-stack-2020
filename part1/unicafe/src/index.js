import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick} >{text}</button>
    </>
  )
}
const Statistic = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}
const Statistics = ({ good, bad, neutral }) => {
  const renderStatics = () => {
    if (good === 0 && bad === 0 && neutral === 0) {
      return <p>No feedback given</p>
    }
    return (
      <>
        <table>
          <tbody>
            <tr>
              <Statistic text="good" value={good} />
            </tr>
            <tr>
              <Statistic text="neutral" value={neutral} />
            </tr>
            <tr>
              <Statistic text="bad" value={bad} />
            </tr>
            <tr>
              <Statistic text="all" value={good + neutral + bad} />
            </tr>
            <tr>
              <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
            </tr>
            <tr>
              <Statistic text="positive" value={(good * 100) / (good + neutral + bad)} />
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>
      <h4>Statistics</h4>
      {renderStatics()}
    </>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h4>give feedback</h4>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)