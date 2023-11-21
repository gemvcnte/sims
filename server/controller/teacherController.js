const { Teacher } = require("../models/TeacherModel");
const asyncHandler = require("express-async-handler");
const generateAuthToken = require("../configs/auth");
const bcryptjs = require("bcryptjs");

const teacherLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    // find yung teacher base sa uname
    const teacher = await Teacher.findOne({ username });

    // check if the teacher exists
    if (!teacher) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcryptjs.compare(password, teacher.password);

    // Check if the passwords match
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const tokenPayload = {
      _id: teacher.id,
      username: teacher.username,
      role: "teacher",
    };

    const token = generateAuthToken(tokenPayload);

    res.json({ message: "Login Successfully.", token });
  } catch (error) {
    console.error(`There is an error ${error}`);
    return res.status(500).json({ message: "Login failed." });
  }
});


const getTeacherDashboard = asyncHandler(async (req,res) => {
  try {
    const { _id } = req.user

    const teacherDashboard = await Teacher.findById(_id)

    if (!teacherDashboard) {
      res.status(404).json({message: 'Teacher dashboard not found'})
    }

    res.status(200).json({message: 'Teacher dashboard retrieved successfully'})
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTeacherSchedule = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    
  }
})

const postClassAnnouncement = asyncHandler (async (req,res) => {

})




module.exports = {
  teacherLogin,
  getTeacherDashboard,
  getTeacherSchedule,
  postClassAnnouncement,
};
