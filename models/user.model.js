const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 55,
      unique: true,
      trimp: true,
    },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, max: 1024, minLenght: 6 },
    picture: { type: String, required: false, default: "./uploads/profil/random-user.png" },
    bio: { type: String, required: false, maxLenght: 1024 },
    followers: { type: String, required: false },
    following: { type: String, required: false },
    likes: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
