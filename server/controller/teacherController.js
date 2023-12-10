const { Teacher } = require("../models/TeacherModel");
const { Student }= require("../models/StudentModel")
const { Classroom }= require("../models/ClassroomModel")
const { Announcement } = require("../models/Announcement");
const asyncHandler = require("express-async-handler");
const generateAuthToken = require("../configs/auth");
const bcryptjs = require("bcryptjs");

const teacherLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    // find yung teacher base sa uname
    const teacher = await Teacher.findOne({ username });
    router.delete("/class/remove-student", verifyToken)


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

const getTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const teacherProfile = await Teacher.findById({ _id });

    if (!teacherProfile) {
      res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json({
      message: "Teacher found",
      teacherData: teacherProfile,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const updateTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const updatedProfileData = req.body;

    // Check if the user making the request matches the user ID in the updatedProfileData
    if (_id !== updatedProfileData._id) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to update this profile.",
      });
    }

    // Find the teacher by their user ID and update their profile
    const teacherProfile = await Teacher.findByIdAndUpdate(
      _id,
      updatedProfileData,
      { new: true }
    );

    // Check if the teacher exists
    if (!teacherProfile) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json({
      message: "Teacher profile updated successfully.",
      teacherData: teacherProfile,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getTeacherSchedule = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const teacherSchedule = await Teacher.findById(_id);

    if (!teacherSchedule) {
      res.status(404).json({ message: "Teacher Schedule not found." });
    } else if (teacherSchedule === null) {
      res.status(204).json({ message: "Teacher schedule is empty" });
    }

    res.status(200).json({ message: "Teacher Schedule has been retrieved." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const postClassAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

    

  } catch (error) {}
});





const assignStudentToClass = asyncHandler(async (req, res) => {
  try {
    const { studentName, sectionName } = req.body;
    const [firstName, lastName] = studentName.split(' ');

    console.log('Attempting to assign student:', { firstName, lastName, sectionName });

    const existingClassroom = await Classroom.findOne({ sectionName });

    if (!existingClassroom) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    const existingStudent = existingClassroom.students.find((student) => student.firstName === firstName && student.lastName === lastName);

    if (existingStudent) {
      return res.status(400).json({ message: 'Student is already assigned to this class.' });
    }


    const studentRecord = await Student.findOne({ firstName, lastName });

    if (!studentRecord) {
      return res.status(404).json({ message: 'Student not found in enrolled records.' });
    }

    existingClassroom.students.push({ firstName, lastName });

    await existingClassroom.save();

    return res.status(200).json({ message: 'Student has been assigned to this class' });
  } catch (error) {
    console.error('Error in assignStudentToClass:', error);
    return res.status(500).json({ message: `${error}` });
  }
});


const removeStudentToClass = asyncHandler(async(req,res) => {
  try {
    const { studentName, sectionName } = req.body;

    const [firstName, lastName] = studentName.split(' ');


    const existingClassroom = await Classroom.findOne({sectionName})


    if (!existingClassroom) {
      res.status(404).json({message: 'Class not found.'})
    }


    const studentIndex = existingClassroom.students.findIndex((student) => student.firstName === firstName && student.lastName === lastName);


    if (studentIndex === -1) {
      res.status(404).json({message: 'Student not found in this class.'})
    }

    await existingClassroom.splice(studentIndex, 1)


    res.status(200).json({message: 'Student has been removed successfully.'})
  } catch (error) {
    res.status(500).json({message: `${error}`})
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
  updateTeacherProfile,
  postClassAnnouncement,
  assignStudentToClass,
  removeStudentToClass
};
