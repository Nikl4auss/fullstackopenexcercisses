import React from "react";
import Part from "./Part";

const Course = ({ course }) => {
  return (
    <>
      {course.map((course) => {
        let { id, name, parts } = course;
        let totalExercises = parts.reduce((s, p) => s + p.exercises, 0);
        return (
          <>
            <h2 key={id}>{name}</h2>
            {parts.map((part) => {
              let { name, exercises, id } = part;
              return <Part key={id} name={name} exercises={exercises} />;
            })}
            <h3>total of exercises: {totalExercises}</h3>
          </>
        );
      })}
    </>
  );
};

export default Course;
