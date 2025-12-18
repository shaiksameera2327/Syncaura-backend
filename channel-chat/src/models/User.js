const mongoose = require("mongoose");
const ROLES = require("../config/roles");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.MEMBER,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
