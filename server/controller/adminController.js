const bcryptjs = require("bcryptjs");
const  { Admin } = require('../models/AdminModel')
const  { Student } = require('../models/StudentModel')
const  { Teacher } = require('../models/TeacherModel')
const  { StudentApplication } = require('../models/StudentApplicationModel')
const { Announcement } = require("../models/Announcement");
const generateAuthToken = require("../configs/auth");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");

dotenv.config();

// creating an admin
const createAdmin = asyncHandler(async (req, res) => {
  try {
    const { name, username, password, idNumber, address } = req.body;

    // Check if the admin already exists based on the username
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this username." });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new admin with the hashed password
    const admin = new Admin({
      name,
      username,
      password: hashedPassword,
      idNumber,
      address,
    });
    await admin.save();

    res.status(200).json({ message: "Admin created successfully." });
  } catch (error) {
    return res.status(500).json({ message: `There is an error ${error}` });
  }
});

const createTeacher = asyncHandler(async (req, res) => {
  try {
    const teacherData = req.body;

    // Check if the teacher already exists based on the username
    const existingTeacher = await Teacher.findOne({
      username: teacherData.username,
    });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher already exists with this username." });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(teacherData.password, 10);

    // Create a new teacher with the hashed password
    const teacher = new Teacher({
      firstName: teacherData.firstName,
      middleName: teacherData.middleName,
      lastName: teacherData.lastName,
      currentAddress: teacherData.currentAddress,
      birthDate: teacherData.birthDate,
      gender: teacherData.gender,
      emailAddress: teacherData.emailAddress,
      username: teacherData.username,
      password: hashedPassword,
    });

    await teacher.save();

    res.status(200).json({ message: "Teacher created successfully." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// logging in as an admin
const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcryptjs.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const tokenPayload = {
      _id: admin.id,
      username: admin.username,
      role: "admin",
    };

    const token = generateAuthToken(tokenPayload);

    res.status(200).json({ message: "Admin login successful", token });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// updating admin
const updateAdmin = asyncHandler(async (req, res) => {
  try {
    const { username, password, ...updateData } = req.body;

    // hahanapin yung username tapos iupdate niya
    const updatedAdmin = await Admin.findOneAndUpdate(
      { username },
      updateData,
      { new: true }
    );

    // pede iupdate yung password kung pinrovide niya
    if (password) {
      updatedAdmin.password = password;
      await updatedAdmin.save();
    }

    res.json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body;

    await Admin.findOneAndDelete({ username });

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `There is an error ${error}` });
  }
});

const acceptStudentApplication = asyncHandler(async (req, res) => {
  try {
    const { studentApplicationId } = req.body;

    // Find the application by ID
    const originalStudentApplication = await StudentApplication.findById(
      studentApplicationId
    );

    if (!originalStudentApplication) {
      return res.status(404).json({ message: "Student Application not found" });
    }

    // Create a new object with an additional "password" field
    const modifiedStudentApplication = {
      ...originalStudentApplication.toObject(),
      password: bcryptjs.hashSync(originalStudentApplication.birthDate, 10), // Replace 10 with your desired js salt rounds
    };

    // Save the modified object to the enrolledStudents collection
    const studentEnrolled = new Student(modifiedStudentApplication);
    await studentEnrolled.save();

    await StudentApplication.findByIdAndUpdate(originalStudentApplication._id, {
      status: "enrolled",
    });

    res.status(200).json({ message: "Student Enrolled" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});


const updateStudentApplication = asyncHandler(async (req,res) => {
  try {
    const {studentApplicationId, updatedData} = req.body


    const studentApplication = await StudentApplication.findById(studentApplicationId)
  
  
    if (!studentApplication) {
      return res.status(400).json({message: `Student Application not found.`})
    }
  
    //update the student application via with the provided data
  
    const updatedStudentData = await StudentApplication.findByIdAndUpdate(studentApplicationId, updatedData, {new: true})
  

    res.status(200).json({message: `Student Application has been updated.`})
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})

const rejectStudentApplication = asyncHandler(async (req,res) => {
  try {
    const { studentApplicationId } = req.body

    const studentApplication = await StudentApplication.findById(studentApplicationId)

    if(!studentApplication) {
      return res.status(400).json({message: `Student Application not found.`})
    } 

    await studentApplication.findByIdAndUpdate({ status: 'rejected'})
    // await studentApplication.remove()
    res.status(200).json({message: 'Student Application has been rejected.'})
  } catch (error) {
    return res.status(500).json({message: `${error}`})
  }
})

// const createTeacher = asyncHandler(async (req, res) => {
//     try {
//         const teacherData = req.body;

//         // Check if the teacher already exists based on the username
//         const existingTeacher = await Teacher.findOne({ username: teacherData.username });
//         if (existingTeacher) {
//             return res.status(400).json({ message: 'Teacher already exists with this username.' });
//         }

//         // Hash the password
//         const hashedPassword = await bcryptjs.hash(teacherData.password, 10);

//         // Create a new teacher with the hashed password
//         const teacher = new Teacher({
//             firstName: teacherData.firstName,
//             middleName: teacherData.middleName,
//             lastName: teacherData.lastName,
//             currentAddress: teacherData.currentAddress,
//             birthDate: teacherData.birthDate,
//             gender: teacherData.gender,
//             emailAddress: teacherData.emailAddress,
//             username: teacherData.username,
//             password: hashedPassword,
//         });

//         await teacher.save();

//         res.status(200).json({ message: 'Teacher created successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: `${error}` });
//     }
// });

const updateTeacher = asyncHandler(async (req, res) => {
  try {
    const { username, password, ...updateData } = req.body;

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { username },
      updateData,
      { new: true }
    );

    if (password) {
      updatedTeacher.password = password;
      await updatedTeacher.save();

      res.json({
        message: "Teacher updated successfully.",
        admin: updatedTeacher,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const deleteTeacher = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body;

    await Teacher.findOneAndDelete({ username });

    res.status(200).json({ message: "Teacher has been delete successfully." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find();

    res.json({
      message: "All students data retrieved successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.json({
      message: "The teachers data retrieved successfully",
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllPending = asyncHandler(async (req, res) => {
  try {
    const findPending = await StudentApplication.find({
      status: "PENDING" || "pending",
    });

    res.json({
      message: "Pending records retrieved successfully ",
      data: findPending,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const createAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

    const announcement = new Announcement({
      title,
      content,
      // createdBy: req.user.username,
    });

    await announcement.save();

    res.status(201).json({
      message: "Announcement created successfully.",
      data: announcement,
    });
    // const announcement =
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const updateAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
  } catch (error) {
    res.json({ message: `${error}` });
  }
});

module.exports = {
  createAdmin,
  adminLogin,
  updateAdmin,
  deleteAdmin,
  acceptStudentApplication,
  updateStudentApplication,
  rejectStudentApplication,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllStudents,
  getAllTeachers,
  getAllPending,
  createAnnouncement,
};
