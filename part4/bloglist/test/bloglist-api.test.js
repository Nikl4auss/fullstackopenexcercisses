const mongoose = require("mongoose");
const Blog = require("../modules/blog");
const User = require("../modules/user");
const helper = require("../utils/blog-helper");
const userHelper = require("../utils/user-helper");
const supertest = require("supertest");
const App = require("../app");
const api = supertest(App);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("Getting the bloglist", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/u);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

test(`the ID of the blogs is formmated like 'id' and not like '_id'`, async () => {
  const blogsInDB = await helper.blogsInDB();
  const blog = blogsInDB[0];
  expect(blog.id).toBeDefined();
});

describe("adding new blogs to the list", () => {
  test("a valid blog can be added to the list by a logged in user", async () => {
    const user = {
      username: "root",
      password: "admin",
    };

    const loggedIn = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const newBlog = {
      title: "Cumbia Epistemologica",
      author: "Daniel Rabinovich, Carlos Nuñez, Carlos Puccio, Jorge Maronna",
      url: "something.com",
      likes: 1000000,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: `Bearer ${loggedIn.body.token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).toContainEqual(
      expect.objectContaining({
        title: "Cumbia Epistemologica",
        author: "Daniel Rabinovich, Carlos Nuñez, Carlos Puccio, Jorge Maronna",
        url: "something.com",
        likes: 1000000,
      })
    );
  });

  test("if the likes property is missing from the blog object, it defaults to 0", async () => {
    const user = {
      username: "root",
      password: "admin",
    };

    const loggedIn = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const newBlog = {
      title: "Cumbia Epistemologica",
      author: "Daniel Rabinovich, Carlos Nuñez, Carlos Puccio, Jorge Maronna",
      url: "something.com",
      user: user.id,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: `Bearer ${loggedIn.body.token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("if the author and/or title is missing the petition is rejected and blog its not added", async () => {
    const user = {
      username: "root",
      password: "admin",
    };

    const loggedIn = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const newBlog = {
      author: "Daniel Rabinovich, Carlos Nuñez, Carlos Puccio, Jorge Maronna",
      url: "something.com",
      likes: 1000000,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: `Bearer ${loggedIn.body.token}` })
      .expect(400);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).not.toContainEqual(
      expect.objectContaining({
        author: "Daniel Rabinovich, Carlos Nuñez, Carlos Puccio, Jorge Maronna",
        url: "something.com",
        likes: 1000000,
      })
    );
  });
});

describe("deleting and updating the blogs", () => {
  test("Blogs can be deleted from the list", async () => {
    const user = {
      username: "root",
      password: "admin",
    };

    const loggedIn = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const token = loggedIn.body.token;

    const newBlog = {
      title: "Cumbia Epistemologica",
      author: "Daniel Rabinovich, Carlos Nuñez, Carlos Puccio, Jorge Maronna",
      url: "something.com",
      likes: 1000000,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const blog = await Blog.findOne({ title: "Cumbia Epistemologica" });

    await api
      .delete(`/api/blogs/${blog._id.toString()}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).not.toContainEqual(
      expect.objectContaining({
        title: "Cumbia Epistemologica",
        author: "Daniel Rabinovich, Carlos Nuñez, Carlos Puccio, Jorge Maronna",
        url: "something.com",
        likes: 1000000,
      })
    );
  });
});

test("Blogs can have theire likes updated", async () => {
  const blogsAtStart = await helper.blogsInDB();
  const blogToBeUpdated = blogsAtStart[0];
  const updatedLikes = {
    likes: 5000,
  };

  await api
    .put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(updatedLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/u);

  const blogsAtEnd = await helper.blogsInDB();

  expect(blogsAtEnd[0].likes).toBe(5000);
});

afterAll(() => {
  mongoose.connection.close();
});
