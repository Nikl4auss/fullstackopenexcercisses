const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  console.log(blogs);
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let highest = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === highest);
};

const mostBlogs = (blogs) => {
  //obtain only the authors from the blogs array
  let authors = blogs.map((blog) => blog.author);
  //check how many times the same author appears on the array
  let blogsByAuthor = lodash.countBy(authors);
  //obtain the author with most blogs
  let author = lodash.maxBy(
    lodash.keys(blogsByAuthor),
    (x) => blogsByAuthor[x]
  );
  let authorWithMostBlogs = {
    author: author,
    blogs: blogsByAuthor[author],
  };
  console.log(authorWithMostBlogs);
  return authorWithMostBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
