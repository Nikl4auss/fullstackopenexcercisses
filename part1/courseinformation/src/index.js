import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10,
      },
      {
        name: "Using props to pass data",
        exercise: 7,
      },
      {
        name: "State of a component",
        exercise: 14,
      },
    ],
  };
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercise)} />
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        const { name, exercise } = part;
        return (
          <>
            <Part key={name} name={name} exercise={exercise} />
          </>
        );
      })}
    </>
  );
};

const Total = ({ exercises }) => {
  console.log(exercises);
  const total = exercises.reduce((acc, element) => acc + element);
  return <h3>Total exercises: {total}</h3>;
};

const Part = ({ name, exercise }) => {
  return (
    <>
      <h2>{name}</h2>
      <p>Exercises: {exercise}</p>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
