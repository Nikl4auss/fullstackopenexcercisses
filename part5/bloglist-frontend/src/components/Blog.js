import React, { useState } from "react";
const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [showMore, setShowMore] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    let update;
    if (liked) {
      update = {
        likes: blog.likes - 1,
      };
    } else {
      update = {
        likes: blog.likes + 1,
      };
    }

    handleUpdate(blog.id, update);
    setLiked(!liked);
  };

  const handleBlogDelete = () => {
    handleDelete(blog.id, blog.title, blog.author);
  };
  return (
    <div className="blog-container">
      {showMore ? (
        <>
          <p>
            {blog.title}{" "}
            <button
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              show less
            </button>{" "}
          </p>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>{" "}
          </p>
          <p>{blog.author}</p>
          <button onClick={handleBlogDelete}>remove</button>
        </>
      ) : (
        <p>
          {blog.title} {blog.author}{" "}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
            className="btn-show"
          >
            show more
          </button>{" "}
        </p>
      )}
    </div>
  );
};

export default Blog;
