import React, { useState } from "react";
const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (event) => {
    event.preventDefault();
    handleLogin({
      username,
      password,
    });
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <h1>log in</h1>
      <form onSubmit={logIn}>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <label htmlFor="password">password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <button type="submit">log in</button>
      </form>
    </div>
  );
};

export default Login;
