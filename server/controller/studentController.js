const { Student } = require("../models/StudentModel");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateAuthToken = require("../configs/auth");

const studentLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    // using the model/schema to directly query the database
    const student = await Student.findOne({ lrn: username });

    if (!student) {
      res.status(401).json({ message: "Invalid LRN or password." });
      return;
    }

    // const hashedInputPassword = await bcryptjs.hash(birthDate, 10);

    if (!(await bcryptjs.compare(password, student.password))) {
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

const getStudentDashboard = asyncHandler(async (req, res) => {
  try {

    const { _id } = req.user

    const studentDashboard = await Student.findById(_id)

    if (!studentDashboard) {
      res.status(404).json({message: 'Student dashboard not found.'})
    }

    res.status(200).json({message: `Student dashboard retrieved successfully.`})
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
});

const getStudentSchedule = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

const getStudentAnnouncements = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

// const updateProfile = asyncHandler(async (req,res) => {
//     try {

//     } catch (error) {

//     }
// })

module.exports = { studentLogin, getStudentDashboard, getSchedule, getAnnouncements };
