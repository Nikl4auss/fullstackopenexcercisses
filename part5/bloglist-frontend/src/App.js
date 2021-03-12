import React, { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Newblog from "./components/NewBlog";
import Toggeable from "./components/Toggeable";
import blogService from "./services/blogs";
import userServices from "./services/user";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const loginRef = useRef();
  const newBlogRef = useRef();

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBloglistUser");
  };

  const handleLogin = async (userCredentials) => {
    try {
      loginRef.current.toggleVisibility();
      const user = await userServices.login(userCredentials);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleNewBlogs = async (newBlog) => {
    newBlogRef.current.toggleVisibility();
    const response = await blogService.createNewBlog(newBlog);
    setBlogs(blogs.concat(response));
  };

  const handleUpdate = async (blogId, update) => {
    const updatedBlog = await blogService.updateBlog(blogId, update);
    setBlogs(
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    );
  };

  const handleDelete = async (blogId, title, author) => {
    const decision = window.confirm(`Remove ${title} from ${author}`);
    if (decision) {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    }
    alert("Delete aborted");
  };

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedBloglistUser");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user === null ? (
        <Toggeable buttonLabel="log in" ref={loginRef}>
          <Login handleLogin={handleLogin} />
        </Toggeable>
      ) : (
        <div>
          <p>
            Welcome {user.username}{" "}
            <button onClick={handleLogout}>Log out</button>
          </p>
        </div>
      )}

      {user !== null ? (
        <div>
          <h2>new blog</h2>
          <Toggeable buttonLabel="add blog" ref={newBlogRef}>
            <Newblog handleNewBlogs={handleNewBlogs} />
          </Toggeable>

          <h2>blogs</h2>
          <Blogs
            blogs={blogs}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
