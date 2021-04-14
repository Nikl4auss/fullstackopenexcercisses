import React from "react";
import { useSelector } from "react-redux";

import Anecdote from "./Anecdote";

const Anecdotes = (props) => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    !filter
      ? state.anecdotes
      : state.anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  );
  return (
    <>
      <div>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => {
            return <Anecdote key={anecdote.id} anecdote={anecdote} />;
          })}
      </div>
    </>
  );
};

export default Anecdotes;
