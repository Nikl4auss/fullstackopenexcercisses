const config = require("./utils/config");
const express = require("express");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./modules/blog");

console.log(config.MONGODB_URI);
console.log(config.PORT);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);

app.use("/api/users", userRouter);

app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
