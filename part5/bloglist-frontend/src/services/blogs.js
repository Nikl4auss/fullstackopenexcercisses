import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async (blogId, update) => {
  const url = `${baseUrl}/${blogId}`;
  const response = await axios.patch(url, update);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${blogId}`;

  const response = await axios.delete(url, config);
  return response.data;
};

export default { getAll, createNewBlog, updateBlog, deleteBlog, setToken };
