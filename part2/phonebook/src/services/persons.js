import axios from "axios";

const base_url = "http://localhost:3001/persons";

const getContacts = () => {
  const request = axios.get(base_url);
  return request.then((response) => response.data);
};

const createContact = (newContact) => {
  const request = axios.post(base_url, newContact);
  return request.then((response) => response.data);
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
};
