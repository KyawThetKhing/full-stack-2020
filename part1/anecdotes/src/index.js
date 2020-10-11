import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoint] = useState(Array(props.anecdotes.length).fill(0))
  const handleGenerateQuote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  }

  const handleVote = (selectedAnecdotes) => {
    const copy = [...points];
    copy[props.anecdotes.indexOf(selectedAnecdotes)] += 1;
    setPoint(copy);
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{props.anecdotes[selected]}</p>
      <button onClick={() => handleVote(props.anecdotes[selected])}>vote</button>
      <button onClick={handleGenerateQuote}>next anecdotes</button>
      <h3>Anecdote with most vote</h3>
      <p>{props.anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)