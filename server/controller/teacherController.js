const { Teacher } = require("../models/TeacherModel");
const  { Announcement } = require('../models/Announcement')
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
      fullName: `${teacher.firstName} ${teacher.lastName}`,
      role: "teacher",
    };

    const token = generateAuthToken(tokenPayload);

    res.json({ message: "Login Successfully.", token });
  } catch (error) {
    console.error(`There is an error ${error}`);
    return res.status(500).json({ message: "Login failed." });
  }
});


const getTeacherProfile = asyncHandler (async (req,res) => {
  try {
    const { _id } =req.user

    const teacherProfile = await Teacher.findById({_id});

    if(!teacherProfile) {
      res.status(404).json({message: 'Teacher not found.'})
    }

    res.status(200).json({
      message: 'Teacher found',
      teacherData: teacherProfile
})
  } catch (error) {
    res.status(500).json({message: `${error}`});
  }
})



const getTeacherSchedule = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user

    const teacherSchedule = await Teacher.findById(_id)


    if (!teacherSchedule) {
      res.status(404).json({message: 'Teacher Schedule not found.'})
    } else if (teacherSchedule === null) {
      res.status(204).json({message: 'Teacher schedule is empty'})
    };

    res.status(200).json({message: 'Teacher Schedule has been retrieved.'})
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})

const postClassAnnouncement = asyncHandler (async (req,res) => {
  try {
    const { announcementId } = req.body

    
  } catch (error) {
    
  }
})

// const requestResetPassword = asyncHandler(async(req,res) => {
//   try {
    
//   const {username, email} = req.body



//   const teacher =   await Teacher.findById({ username, email })

//   const token = generateAuthToken

//   teacher.resetPasswordToken = token;
//   await teacher.save()


//   sendResetPasswordNotificationToAdmin(token, teacher)


//   res.status(200).json({message: 'Request has been delivered.'})

//   } catch (error) {
//     res.status(500).json({message: `${error}`})
//   }
// });


module.exports = {
  teacherLogin,
  getTeacherSchedule,
  getTeacherProfile,
  postClassAnnouncement,
};
