const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
require("express-async-errors");
const Blog = require("../modules/blog");
const User = require("../modules/user");

blogsRouter.get("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const blogs = await Blog.find({ user: decodedToken.id }).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const token = request.token ? request.token : null;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token && !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token ? request.token : null;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await blog.remove();
    user.blogs = user.blogs.filter(
      (blog) => blog.id.toString() !== request.params.id.toString()
    );
    await user.save();
    console.log("succeded");
    response.status(204).end();
  }
  console.log("failed");
  response.status(204).end();
});

blogsRouter.patch("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
