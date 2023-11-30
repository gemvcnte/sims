const { Student } = require("../models/StudentModel");
const { Announcement } = require("../models/Announcement");
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
      fullName: `${student.firstName} ${student.lastName}`,
      role: "student",
    };

    const token = generateAuthToken(tokenPayload);

    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    console.error(`There is an error ${error}`);
    res.status(500).json({ message: "Login failed." });
  }
});

const getStudentSchedule = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
  } catch (error) { }
});

const getStudentAnnouncements = asyncHandler(async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ message: `${error}` })
  }
});

const getStudentProfile = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const studentProfile = await Student.findById(_id);

    if (!studentProfile) {
      res.status(404).json({ message: "Student Profile not found." });
    } 
    
    res.status(200).json({
      message: 'Student profile has been retrieved.',
      studentProfile: studentProfile,
    })
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});



// const requestResetPassword = asyncHandler(async(req,res) => {
//   try {

//   const {lrn, email} = req.body



//   const student =   await Student.findById({ lrn })

//   const token = generateAuthToken

//   student.resetPasswordToken = token;
//   await student.save()


//   sendResetPasswordNotificationTostudent(token, student)


//   res.status(200).json({message: 'Request has been delivered.'})

//   } catch (error) {
//     res.status(500).json({message: `${error}`})
//   }
// });


// const requestUpdateStudentProfile = asyncHandler(async (req, res) => {
//   try {
//     const { lrn } = req.body


//     const student = await Student.findById({ lrn })

//     const token = generateAuthToken()
//     student.resetCredentialToken = token;
//     await student.save()

//     res.status(200).json({ message: 'Request for changing a credential has been sent.' })
//   } catch (error) {
//     res.status(500).json({ message: `${error}` })
//   }
// })


// const updateAdditionalInformation = asyncHandler(async(req,res) => {
//   await
// })

// const updateStudentProfile = asyncHandler(async (req,res) => {
//   try {
//     const {...updateData} = req.body

//     const updateStudentProfile
//   } catch (error) {

//   }
// })



module.exports = {
  studentLogin,
  getStudentSchedule,
  getStudentAnnouncements,
  getStudentProfile,
  requestUpdateStudentProfile,
};
