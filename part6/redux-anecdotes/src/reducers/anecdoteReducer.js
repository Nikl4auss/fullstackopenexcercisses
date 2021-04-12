import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NEW_ANECDOTE": {
      return state.concat(action.data);
    }
    case "VOTE_ANECDOTE": {
      const id = action.data.id;
      const votedAnecdote = action.data;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    }

    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdotesService.newAnecdote(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newNote,
    });
  };
};

export const vote = (id, update) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.voteAnecdote(id, {
      votes: update,
    });
    dispatch({
      type: "VOTE_ANECDOTE",
      data: updatedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: notes,
    });
  };
};

export default reducer;
