import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// const Header = (props) => (
//   <h1>{props.course}</h1>
// )

// const Content = (props) => (
//   <>
//     {props.parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
//   </>
// )

// const Part = (props) => (
//   <p>
//     {props.part} {props.exercises}
//   </p>
// )
// const Total = ({ parts }) => {
//   console.log('Props', parts)
//   const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
//   console.log('total', total)
//   return (
//     <>
//       <h4>total of {total} exercises </h4>
//     </>
//   )
// }
// const Course = ({ course }) => {
//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }
// const App = () => {
//   const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10,
//           id: 1
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7,
//           id: 2
//         },
//         {
//           name: 'State of a component',
//           exercises: 14,
//           id: 3
//         },
//         {
//           name: 'Redux',
//           exercises: 11,
//           id: 4
//         }
//       ]
//     },
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         {
//           name: 'Routing',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     }
//   ]
//   return (
//     <div>
//       {courses.map((course) => <Course course={course} key={course.id} />)}
//     </div>
//   )
//   // return (
//   //   <div>
//   //     <Header course={course.name} />
//   //     <Content parts={course.parts} />
//   //     <Total parts={course.parts} />
//   //   </div>
//   // )
// }

ReactDOM.render(<App />, document.getElementById('root'));