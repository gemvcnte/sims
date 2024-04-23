const bcryptjs = require("bcryptjs");
const generateAuthToken = require("../configs/auth");
const expressAsyncHandler = require("express-async-handler");

const { Admin } = require("../models/AdminModel");
const { Teacher } = require("../models/TeacherModel");

const facultyLogin = expressAsyncHandler(async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase();

    let user;

    user = await Admin.findOne({ username });
    if (user) {
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (passwordMatch) {
        const tokenPayload = {
          _id: user.id,
          username: user.username,
          fullName: `${user.firstName} ${user.lastName}`,
          role: "admin",
        };
        const token = generateAuthToken(tokenPayload);
        return res
          .status(200)
          .json({ message: "Admin login successful", token });
      }
    }

    user = await Teacher.findOne({ username });
    if (user) {
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (passwordMatch) {
        const tokenPayload = {
          _id: user.id,
          username: user.username,
          fullName: `${user.firstName} ${user.lastName}`,
          role: "teacher",
        };
        const token = generateAuthToken(tokenPayload);
        return res
          .status(200)
          .json({ message: "Teacher login successful", token });
      }
    }

    return res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    console.error(`There is an error: ${error}`);
    res.status(500).json({ message: "Login failed." });
  }
});

module.exports = { facultyLogin };
