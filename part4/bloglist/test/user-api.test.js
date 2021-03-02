const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const helper = require("../utils/user-helper");
const User = require("../modules/user");
const { response } = require("express");

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      username: user.username,
      name: user.name,
      passwordHash,
    });

    await newUser.save();
  }
});

describe("getting users", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/u);
  });

  test("all users are returned", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });
});

describe("adding users to the database", () => {
  test("a valid user can be added and its respondend with the correct status code", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: "Juani",
      name: "Juanito",
      password: "pika pika",
    };

    await api.post("/api/users").send(newUser).expect(200);

    const usersAtEnd = await helper.usersInDB();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usersNames = usersAtEnd.map((users) => users.username);

    expect(usersNames).toContain(newUser.username);
  });
});

describe("failing to add user to the database", () => {
  describe("missing information", () => {
    test("a user with missing username will not be added", async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        name: "Juanito",
        password: "1234",
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/u);

      expect(response.body.error).toContain("`username` is required");

      const usersAtEnd = await helper.usersInDB();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      const usersNames = usersAtEnd.map((users) => users.username);

      expect(usersNames).not.toContain(newUser.username);
    });

    test("a user with missing password will not be added", async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: "Juani",
        name: "Juanito",
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/u);

      expect(response.body.error).toContain("password missing");

      const usersAtEnd = await helper.usersInDB();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      const usersNames = usersAtEnd.map((users) => users.username);

      expect(usersNames).not.toContain(newUser.username);
    });
  });

  describe("malformed information", () => {
    test("a user with a username less than 3 characters long won't be added", async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: "Ju",
        name: "Juanito",
        password: "lololo",
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/u);

      expect(response.body.error).toContain(
        "shorter than the minimum allowed length"
      );

      const usersAtEnd = await helper.usersInDB();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      const usersNames = usersAtEnd.map((users) => users.username);

      expect(usersNames).not.toContain(newUser.username);
    });

    test("a user with a password less than 3 characters long wont be added", async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: "Juani",
        name: "Juanito",
        password: "lo",
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/u);

      expect(response.body.error).toContain(
        "password must be more than 3 characters length"
      );

      const usersAtEnd = await helper.usersInDB();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      const usersNames = usersAtEnd.map((users) => users.username);

      expect(usersNames).not.toContain(newUser.username);
    });

    test("username must be unique", async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: "root",
        name: "supertest",
        password: "admin",
      };

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/u);

      expect(response.body.error).toContain("`username` to be unique");

      const usersAtEnd = await helper.usersInDB();

      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
