import React from "react";
import { useDispatch } from "react-redux";
import { settingNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(createAnecdote(content));
    dispatch(settingNotification(`you added the anecdote "${content}"`, 5));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

export default NewAnecdoteForm;
