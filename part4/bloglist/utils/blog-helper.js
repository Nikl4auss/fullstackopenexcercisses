const Blog = require("../modules/blog");
const User = require("../modules/user");

const users = async () => {
  return await User.find({})[0];
};

const user = users();

const initialBlogs = [
  {
    title: "A la playa con Mariana",
    author: "Marcos Mundstock",
    url: "somewhere.com",
    likes: 10,
    user: user._id,
  },
  {
    title: "Daniel y el Señor",
    author: "Daniel Rabinovich",
    url: "somewhere.com",
    likes: 15,
    user: user._id,
  },
  {
    title: "Quien conociera a Maria amaria a Maria",
    author: "Jorge Maronna",
    url: "somewhere.com",
    likes: 8,
    user: user._id,
  },
  {
    title: "Añoralgias",
    author: "Carlos Nuñez",
    url: "somewhere.com",
    likes: 12,
    user: user._id,
  },
  {
    title: "Katy, la reina del saloon",
    author: "Carlos Puccio",
    url: "somewhere.com",
    likes: 9,
    user: user._id,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDB,
};
