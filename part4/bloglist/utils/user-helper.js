const User = require("../modules/user");

const initialUsers = [
  {
    username: "root",
    name: "superuser",
    password: "admin",
  },
  {
    username: "nikl4auss",
    name: "Nicolas Joel Marinelli",
    password: "1825/1508",
  },
  {
    username: "mil3e",
    name: "Milena Yasmin Lizarraga",
    password: "1234aviaungáto",
  },
];

const usersInDB = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  usersInDB,
};
