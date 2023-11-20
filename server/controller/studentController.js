const { Student } = require("../models/StudentModel");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateAuthToken = require("../configs/auth");

const studentLogin = asyncHandler(async (req, res) => {
  try {
    const { lrn, birthDate } = req.body;

    // using the model/schema to directly query the database
    const student = await Student.findOne({ lrn });

    if (!student) {
      res.status(401).json({ message: "Invalid LRN or password." });
      return;
    }

    const hashedInputPassword = await bcryptjs.hash(birthDate, 10);

    if (!(await bcryptjs.compare(hashedInputPassword, student.birthDate))) {
      res.status(401).json({ message: "Invalid LRN or password." });
      return;
    }

    const tokenPayload = {
      _id: student.id,
      username: student.username,
      role: "student",
    };

    const token = generateAuthToken(tokenPayload);

    res.json({ message: "Login Successfully", token });
  } catch (error) {
    console.error(`There is an error ${error}`);
    res.status(500).json({ message: "Login failed." });
  }
});

const getDashboard = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

const getSchedule = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

const getAnnouncements = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// const updateProfile = asyncHandler(async (req,res) => {
//     try {

//     } catch (error) {

//     }
// })

module.exports = { studentLogin, getDashboard, getSchedule, getAnnouncements };
