import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content
        parts={[
          { title: part1, exercise: exercises1 },
          { title: part2, exercise: exercises2 },
          { title: part3, exercise: exercises3 },
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <>
      {parts.map((part) => {
        const { title, exercise } = part;
        return (
          <>
            <h2>{title}</h2>
            <p>Exercises: {exercise}</p>
          </>
        );
      })}
    </>
  );
};

const Total = ({ exercises }) => {
  const total = exercises.reduce((acc, element) => acc + element);
  return <h3>Total exercises: {total}</h3>;
};

ReactDOM.render(<App />, document.getElementById("root"));
