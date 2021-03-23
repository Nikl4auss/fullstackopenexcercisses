const testRouter = require("express").Router();
const { request } = require("express");
const Blog = require("../modules/blog");
const User = require("../modules/user");

testRouter.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

testRouter.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  response.status(204).end();
});

module.exports = testRouter;
