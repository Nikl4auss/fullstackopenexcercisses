require("express-async-errors");
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../modules/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.password) {
    return response.status(400).json({ error: "password missing" });
  }

  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be more than 3 characters length" });
  }
  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = userRouter;
