import React from "react";
import { useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { settingNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(vote(anecdote.id, anecdote.votes + 1));
    dispatch(settingNotification(`you voted "${anecdote.content}"`, 5));
  };
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has votes {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
