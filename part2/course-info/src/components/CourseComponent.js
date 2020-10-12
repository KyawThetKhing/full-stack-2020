import React from 'react';


const Header = (props) => (
    <h1>{props.course}</h1>
)

const Content = (props) => (
    <>
        {props.parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)
const Total = ({ parts }) => {
    console.log('Props', parts)
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
    console.log('total', total)
    return (
        <>
            <h4>total of {total} exercises </h4>
        </>
    )
}

const CourseComponent = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default CourseComponent;