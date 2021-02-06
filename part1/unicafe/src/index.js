import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };
  const addNeutral = () => {
    setNeutral(neutral + 1);
  };
  const addBad = () => {
    setBad(bad + 1);
  };

  const all = () => {
    return good + neutral + bad;
  };

  const average = () => {
    if (all() === 0) {
      return 0;
    }
    return (good - bad) / all();
  };

  const positivePorcentage = () => {
    if (all() === 0) {
      return 0;
    }
    return (good / all()) * 100;
  };

  return (
    <>
      <div className="feedback">
        <h1>give feedback</h1>
        <Button handleClick={addGood} text="good"></Button>
        <Button handleClick={addNeutral} text="neutral"></Button>
        <Button handleClick={addBad} text="bad"></Button>
      </div>
      <div className="stadistics">
        <Stadistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positivePorcentage={positivePorcentage}
        />
      </div>
    </>
  );
};

const Stadistics = ({
  good,
  neutral,
  bad,
  all,
  average,
  positivePorcentage,
}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h2>Stadistics</h2>
        <p>No stadistics have been submiteed</p>
      </>
    );
  }
  return (
    <>
      <h2>Stadistics</h2>
      <table>
        <Stadistic text={"good"} value={good} />
        <Stadistic text={"neutral"} value={neutral} />
        <Stadistic text={"bad"} value={bad} />
        <Stadistic text={"all"} value={all()} />
        <Stadistic text={"average"} value={average()} />
        <Stadistic text={"Positive"} value={`${positivePorcentage()} %`} />
      </table>
    </>
  );
};

const Stadistic = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

ReactDOM.render(<App />, document.getElementById("root"));
