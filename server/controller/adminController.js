  const bcryptjs = require("bcryptjs");
  const  { Admin } = require('../models/AdminModel');
  const  { Student } = require('../models/StudentModel');
  const  { Teacher } = require('../models/TeacherModel');
  const  { StudentApplication } = require('../models/StudentApplicationModel');
  const { Announcement } = require('../models/Announcement')
  const generateAuthToken = require("../configs/auth");
  const dotenv = require("dotenv");
  const asyncHandler = require("express-async-handler");

  dotenv.config();

  // creating an admin
  const createAdmin = asyncHandler(async (req, res) => {
    try {
      const { name, username, password, idNumber, address } = req.body;

      // Check if the admin already exists based on th  e username
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        res.status(400).json({ message: "Admin already exists with this username." });
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

  // api to create a teacher
  const createTeacher = asyncHandler(async (req, res) => {
    try {
      const teacherData = req.body;

      // Check if the teacher already exists based on the username
      const existingTeacher = await Teacher.findOne({
        username: teacherData.username,
      });
      if (existingTeacher) {
        return res.status(400).json({ message: "Teacher already exists with this username." });
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
        fullName: `${admin.firstName} ${admin.lastName}`,
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

  // delete admin
  const deleteAdmin = asyncHandler(async (req, res) => {
    try {
      const { username } = req.body;

      const admin = await Admin.findOneAndDelete({ username });

      if (!admin) {
        res.status(404).json({message: "There is no username chuchu"})
      }

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

      // save yung modified object sa enrolledStudents collection
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
      const { studentApplicationId, updatedData } = req.body


      const studentApplication = await StudentApplication.findById(studentApplicationId)
    
    
      if (!studentApplication) {
        return res.status(400).json({message: `Student Application not found.`})
      }
    
      //update the student application via with the provided data
    
      const updatedStudentData = await StudentApplication.findByIdAndUpdate(studentApplicationId, updatedData, {new: true})
    

      res.status(200).json({
        message: `Student Application has been updated.`,
        data: updatedStudentData
    })
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

  const getAllTeachers = asyncHandler(async (req, res) => {
    try {
      const retrieveTeachers = await Teacher.find();

      res.status(200).json({
        message: "The teachers data retrieved successfully",
        data: retrieveTeachers,
      });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  });

const getSpecificTeacher = asyncHandler(async (req,res) => {
  try {
    const {_id} = req.params

    const findTeacher = await Teacher.findById(_id)
  
    if (!findTeacher) {
      res.status(404).json({message: 'There is no teacher with this ID.'})
    }
  
    res.status(200).json({
      message: 'Teacher has been found',
      data: findTeacher
    })
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})

const getAllAdmins = asyncHandler(async (req,res) => {
  try {
    const retrieveAdmins = await Admin.find()

    if (!retrieveAdmins) {
      res.status(404).json({message: `There are nothing here`})
    }

    res.status(200).json({
      message: "All Admins data retrieved successfully.",
      data: retrieveAdmins
    })
    
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})

const getSpecificAdmin = asyncHandler(async (req,res) => {
  try {
    const {_id} = req.body

    const findAdmin = await Admin.findById(_id)
    res.status(200).json({
      message: 'Admin retrieved successfully',
      data: findAdmin,
    })
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})

  const getAllStudents = asyncHandler(async (req, res) => {
    try {
      const retrieveStudents = await Student.find();

      res.json({
        message: "All students data retrieved successfully",
        data: retrieveStudents,
      });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  });

  const getSpecificStudent = asyncHandler(async(req,res) => {
    try {
      const { lrn } = req.body

      const retrieveSpecificStudent = await Student.findById(lrn);

      if (!retrieveSpecificStudent) {
        res.status(404).json({message: 'There is no Student with this LRN.'});
      }

      res.status(200).json({
      message: 'Student retrieved successfully.',
      data: retrieveSpecificStudent
      })
    } catch (error) {
      res.status(500).json({message: `${error}`})
    }
  })

  const getAllPending = asyncHandler(async (req, res) => {
    try {
      const findPending = await StudentApplication.find({
        status: "PENDING" || "pending",
      });

      if (!findPending) {
        res.status(404).json({message: 'There are no pending applications right now.'})
      }

      res.status(200).json({
        message: "Pending records retrieved successfully. ",
        data: findPending,
      });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  });


  // creating an announcement for the school 
  const createSchoolAnnouncement = asyncHandler(async (req, res) => {
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

  const updateSchoolAnnouncement = asyncHandler(async (req, res) => {
    try {
      const { title, content } = req.body;

      const updatedAnnouncement = await Announcement.findOneAndUpdate({title, content}, updateAnnouncement, {new: true});


      res.status(200).json({message: 'Announcement has been successfully been updated.', data: updatedAnnouncement})
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  });

  const deleteSchoolAnnouncement = asyncHandler(async (req,res) => {
    try {
      const { title } = req.body;


    await Announcement.findOneAndDelete(title)


    res.status(200).json({message: 'Announcement has been deleted'})

    } catch (error) {
      res.status(500).json({message: `${error}`})
    }
  })

  const getAllSchoolAnnouncements = asyncHandler(async (req,res) => {
    try {

      const retrieveAnnouncements = await Announcement.find()

      if(!retrieveAnnouncements) {
        res.status(404).json({message: 'There are no announcements.'})
      }

      res.status(200).json({ message: 'All Announcement retrieved successfully.', data: retrieveAnnouncements})
    } catch (error) {
      res.status(500).json({message: `${error}`})
    }
  })

  module.exports = {
    getAllAdmins,
    createAdmin,
    adminLogin,
    updateAdmin,
    deleteAdmin,
    getSpecificAdmin,
    acceptStudentApplication,
    updateStudentApplication,
    rejectStudentApplication,
    getSpecificStudent,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllStudents,
    getAllTeachers,
    getSpecificTeacher,
    getAllPending,
    createSchoolAnnouncement,
    updateSchoolAnnouncement,
    deleteSchoolAnnouncement,
    getAllSchoolAnnouncements,
  };




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
  //             admin.lastName: teacherData.admin.lastName,
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