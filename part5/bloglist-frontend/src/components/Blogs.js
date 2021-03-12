import React, { useState } from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, handleUpdate, handleDelete }) => {
  const [sorted, setSorted] = useState(false);

  const handleSort = () => {
    setSorted(!sorted);
  };
  return (
    <div>
      <button onClick={handleSort}>sort</button>
      {sorted
        ? blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))
        : blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
    </div>
  );
};

export default Blogs;
