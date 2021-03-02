const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

userSchema = new mongoose.Schema({
  username: {
    minlength: 3,
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
