import axios from "axios";

const base_url = "/api/persons";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getContacts = () => {
  const request = axios.get(base_url);
  return request.then((response) => response.data);
};

const createContact = async (newContact) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(base_url, newContact, config);
  return response.data;
};

const deleteContact = (id) => {
  const request = axios.delete(`${base_url}/${id}`);
  return request.then((response) => response.data);
};

const updateContact = (id, newContact) => {
  const request = axios.put(`${base_url}/${id}`, newContact);
  return request.then((response) => response.data);
};

export default {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  setToken,
};
