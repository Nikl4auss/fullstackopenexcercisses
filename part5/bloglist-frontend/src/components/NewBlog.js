import React, { useState } from "react";

const Newblog = ({ handleNewBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    handleNewBlogs({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <label htmlFor="title">title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor="author">author: </label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor="url">url: </label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">add new blog</button>
      </form>
    </div>
  );
};

export default Newblog;
