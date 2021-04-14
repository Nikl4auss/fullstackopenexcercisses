import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const voteAnecdote = async (id, update) => {
  const response = await axios.patch(`${baseUrl}/${id}`, update);
  return response.data;
};

const anecdotesService = {
  getAll,
  newAnecdote,
  voteAnecdote,
};

export default anecdotesService;
