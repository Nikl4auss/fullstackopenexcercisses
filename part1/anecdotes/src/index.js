import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const randomAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    if (randomNumber === selected) {
      do {
        randomNumber = Math.floor(Math.random() * anecdotes.length);
      } while (randomNumber === selected);
    }
    setSelected(randomNumber);
  };
  const vote = () => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  const mostVotedAnecdote = () => {
    let mostVoted = Math.max(...votes);
    let index = votes.indexOf(mostVoted);
    return [
      mostVoted,
      <>
        <p>{anecdotes[index]}</p>
        <p>With {mostVoted} votes</p>
      </>,
    ];
  };
  let [voted, anecdote] = mostVotedAnecdote();
  return (
    <>
      <div>
        <h1>Anecdote of the day </h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes.</p>
        <Button handleClick={randomAnecdote} text="next anecdote" />
        <Button handleClick={vote} text="vote" />
      </div>
      <div>
        <h2>Most voted anecdote: </h2>
        {voted === 0 ? <p>No votes have been submitted yet</p> : anecdote}
      </div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
