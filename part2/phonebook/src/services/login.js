import axios from "axios";

const base_url = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(base_url, credentials);
  return response.data;
};

export default { login };
