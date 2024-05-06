const bcryptjs = require("bcryptjs");
const { Admin } = require("../models/AdminModel");
const { Student } = require("../models/StudentModel");
const ArchivedStudent = require("../models/ArchivedStudentModel");
const {ArchivedTeacher} = require("../models/ArchivedTeacherModel");
const {ArchivedAdmin} = require("../models/ArchivedAdminModel");
const { Teacher } = require("../models/TeacherModel");
const { StudentApplication } = require("../models/StudentApplicationModel");
const { GlobalSettings } = require('../models/GlobalSettingsModel');
const nodeMailer = require("nodemailer");
const { Classroom } = require("../models/ClassroomModel");
const { Announcement } = require("../models/Announcement");
const { transporter } = require("../mailer");
const generateAuthToken = require("../configs/auth");
const generateEmailTemplate = require("../templates/emailTemplate");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
// const { validationResult, check } = require('express-validator');


dotenv.config();

// creating an admin
const createAdmin = asyncHandler(async (req, res) => {
  try {
    const adminData = req.body;

    const cleanedFirstName = adminData.firstName.replace(/\s/g, "");
    const cleanedLastName = adminData.lastName.replace(/\s/g, "");

    // Generate username by combining firstname and lastname
    const username = (cleanedFirstName + "." + cleanedLastName).toLowerCase();
    // const username = (
    //   adminData.firstName +
    //   "." +
    //   adminData.lastName
    // ).toLowerCase();

    // Check if the admin already exists based on the username
    const existingAdmin = await Admin.findOne({
      username: username,
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this username." });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(adminData.birthDate, 10);

    // Create a new teacher with the hashed password
    const admin = new Admin({
      ...adminData,
      username: username,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ message: "Admin created successfully." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// api to create a teacher
// const createTeacher = asyncHandler(async (req, res) => {
//   try {
//     const teacherData = req.body;

//     // Generate username by combining firstname and lastname
//     const username = (
//       teacherData.firstName +
//       "." +
//       teacherData.lastName
//     ).toLowerCase();

//     // Check if the teacher already exists based on the username
//     const existingTeacher = await Teacher.findOne({
//       username: username,
//     });
//     if (existingTeacher) {
//       return res
//         .status(400)
//         .json({ message: "Teacher already exists with this username." });
//     }

//     // Hash the password
//     const hashedPassword = await bcryptjs.hash(teacherData.birthDate, 10);

//     // Create a new teacher with the hashed password
//     const teacher = new Teacher({
//       ...teacherData,
//       username: username,
//       password: hashedPassword,
//     });

//     await teacher.save();

//     res.status(201).json({ message: "Teacher created successfully." });
//   } catch (error) {
//     res.status(500).json({ message: `${error}` });
//   }
// });

const createTeacher = asyncHandler(async (req, res) => {
  try {
    const teacherData = req.body;

    // Remove spaces from the firstName
    const cleanedFirstName = teacherData.firstName.replace(/\s/g, "");

    const cleanedLastName = teacherData.lastName.replace(/\s/g, "");

    // Generate username by combining cleaned firstName and lastName
    const username = (cleanedFirstName + "." + cleanedLastName).toLowerCase();

    //before
    // const username = (
    //   teacherData.firstName +
    //   "." +
    //   teacherData.lastName
    // ).toLowerCase();

    // Check if the teacher already exists based on the username
    const existingTeacher = await Teacher.findOne({
      username: username,
    });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher already exists with this username." });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(teacherData.birthDate, 10);

    // Create a new teacher with the hashed password
    const teacher = new Teacher({
      ...teacherData,
      username: username,
      password: hashedPassword,
    });

    await teacher.save();

    res.status(201).json({ message: "Teacher created successfully." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// logging in as an admin
const adminLogin = asyncHandler(async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase(); 

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

    res
      .status(200)
      .json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update profile
const updateAdminProfile = asyncHandler(async (req, res) => {
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

    // Find the admin by their user ID and update their profile
    const adminProfile = await Admin.findByIdAndUpdate(
      _id,
      updatedProfileData,
      { new: true }
    );

    // Check if the admin exists
    if (!adminProfile) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({
      message: "Admin profile updated successfully.",
      adminData: adminProfile,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// delete admin
const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body;

    const admin = await Admin.findOneAndDelete({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    return res.status(202).json({ message: "Admin deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `There is an error ${error}` });
  }
});




const acceptStudentApplication = asyncHandler(async (req, res) => {
  try {
    const { studentApplicationId } = req.body;

    // Find the application by ID
    const originalStudentApplication = await StudentApplication.findById(studentApplicationId);

    if (!originalStudentApplication) {
      return res.status(404).json({ error: "The student application could not be found." });
    }

    // Check for LRN conflict with different last name
    const existingEnrolledStudentWithLastnameConflict = await Student.findOne({
      lrn: originalStudentApplication.lrn,
      lastName: { $ne: originalStudentApplication.lastName }
    });

    if (existingEnrolledStudentWithLastnameConflict) {
      return res.status(400).json({ error: "The LRN provided is already associated with a student who has a different last name." });
    }


    // Retrieve the student profile based on LRN
    let studentProfile = await Student.findOne({ lrn: originalStudentApplication.lrn });

    // If the student profile doesn't exist, create a new one
    if (!studentProfile) {
      const hashedPassword = bcryptjs.hashSync(originalStudentApplication.birthDate, 10);
      studentProfile = new Student({
        ...originalStudentApplication.toObject(),
        password: hashedPassword,
        status: "enrolled",
      });
    } else if (originalStudentApplication.hasAccount) {
     // Add schoolYear object to the beginning of the schoolYear array
     studentProfile.schoolYear.unshift(originalStudentApplication.schoolYear[0]);
     studentProfile.status = "enrolled";
   } else  {
     // Update existing fields
     studentProfile.firstName = originalStudentApplication.firstName;
     studentProfile.middleName = originalStudentApplication.middleName;
    // lastName shouldn't be changed because it wouldn't work anyway 
    //  because existingEnrolledStudentWithLastnameConflict checks for lastname
    // and this function will only be read or run if existingEnrolledStudentWithLastnameConflict got passed
    //  studentProfile.lastName = originalStudentApplication.lastName;
     studentProfile.extensionName = originalStudentApplication.extensionName;
     studentProfile.birthDate = originalStudentApplication.birthDate;
     studentProfile.gender = originalStudentApplication.gender;
     studentProfile.currentAddress = originalStudentApplication.currentAddress;
     studentProfile.emailAddress = originalStudentApplication.emailAddress;
     studentProfile.guardianName = originalStudentApplication.guardianName;
     studentProfile.guardianContactNumber = originalStudentApplication.guardianContactNumber;
     studentProfile.guardianRelationship = originalStudentApplication.guardianRelationship;

    // Add schoolYear object to the beginning of the schoolYear array
    studentProfile.schoolYear.unshift(originalStudentApplication.schoolYear[0]);

     studentProfile.status = "enrolled";
    }

    // Save the updated or new student profile
    await studentProfile.save();

    // Update status of student application to "enrolled"
    await StudentApplication.findByIdAndUpdate(studentApplicationId, { status: "enrolled" });

    res.status(200).json({ message: "Student information updated and enrolled" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});






const updateStudentApplication = asyncHandler(async (req, res) => {
  try {
    const { studentApplicationId, updatedData } = req.body;

    const studentApplication = await StudentApplication.findById(
      studentApplicationId
    );

    if (!studentApplication) {
      return res
        .status(400)
        .json({ message: `Student Application not found.` });
    }

    //update the student application via with the provided data

    const updatedStudentData = await StudentApplication.findByIdAndUpdate(
      studentApplicationId,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: `Student Application has been updated.`,
      data: updatedStudentData,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const rejectStudentApplication = asyncHandler(async (req, res) => {
  try {
    const { studentApplicationId } = req.body;

    const studentApplication = await StudentApplication.findById(
      studentApplicationId
    );

    if (!studentApplication) {
      return res
        .status(400)
        .json({ message: `Student Application not found.` });
    }

    await StudentApplication.updateOne(
      { _id: studentApplicationId },
      { status: "rejected" }
    );

    res.status(200).json({ message: "Student Application has been rejected." });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});

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

      return res.status(200).json({
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

    res.status(202).json({ message: "Teacher has been delete successfully." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const retrieveTeachers = await Teacher.find();
    const retrieveAdminTeachers = await Admin.find();

    const allTeachers = [...retrieveTeachers, ...retrieveAdminTeachers];

    // sort alphabetical
    allTeachers.sort((a, b) => {
      const fullNameTeacher = `${a.lastName}, ${a.firstName}, ${a.middleName}`;
      const fullNameAdmin = `${b.lastName}, ${b.firstName}, ${b.middleName}`;
      return fullNameTeacher.localeCompare(fullNameAdmin);
    });
    // Map the retrieved data to create a new array with the desired fields
    const modifiedData = allTeachers.map((teacher) => ({
      username: teacher.username,
      fullName: `${teacher.lastName}, ${teacher.firstName}, ${teacher.middleName}`,
    }));

    res.status(200).json({
      message: "The teachers data retrieved successfully",
      data: modifiedData,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getSpecificTeacher = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    const findTeacher = await Teacher.findById(_id);

    if (!findTeacher) {
      res.status(404).json({ message: "There is no teacher with this ID." });
    }

    res.status(200).json({
      message: "Teacher has been found",
      data: findTeacher,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllAdmins = asyncHandler(async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";

    if (!isAdmin) {
      return res
        .status(403)
        .json({
          message:
            "Forbidden: You do not have permission to perform this action.",
        });
    }

    const retrieveAdmins = await Admin.find().sort({ lastName: 1 });

    if (!retrieveAdmins) {
      res.status(404).json({ message: `There are nothing here` });
    }

    res.status(200).json({
      message: "All Admins data retrieved successfully.",
      data: retrieveAdmins,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getSpecificAdmin = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;

    const findAdmin = await Admin.findById(_id);
    res.status(200).json({
      message: "Admin retrieved successfully",
      data: findAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAdminProfile = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const adminProfile = await Admin.findById({ _id });

    if (!adminProfile) {
      res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({
      message: "Admin found",
      adminData: adminProfile,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";

    if (!isAdmin) {
      return res
        .status(403)
        .json({
          message:
            "Forbidden: You do not have permission to perform this action.",
        });
    }

    const retrieveStudents = await Student.find().sort({ lastName: 1, firstName: 1 });

    if (!retrieveStudents) {
      res.status(404).json({ message: "There is nothing here." });
    }

    res.status(200).json({
      message: "All students data retrieved successfully",
      data: retrieveStudents,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getSpecificStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const retrieveSpecificStudent = await Student.findById({ lrn: id });

    if (!retrieveSpecificStudent) {
      res.status(404).json({ message: "There is no Student with this LRN." });
    }

    res.status(200).json({
      message: "Student retrieved successfully.",
      data: retrieveSpecificStudent,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllApproved = asyncHandler(async (req, res) => {
  try {
    // const findApproved = await StudentApplication.find({
    //   status: "APPROVED" || "approved",
    // });
    const findApproved = await StudentApplication.find({
      status: { $in: ["ENROLLED", "enrolled"] }, 
    }).sort({ lastName: 1 }); 


    if (!findApproved) {
      return res
        .status(404)
        .json({ message: "There are no approved applications right now." });
    }

    return res.status(200).json({
      message: "Approved records retrieved successfully.",
      data: findApproved,
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});

const getAllRejected = asyncHandler(async (req, res) => {
  try {
    // const findRejected = await StudentApplication.find({
    //   status: "REJECTED" || "rejected",
    // });
    const findRejected = await StudentApplication.find({
      status: { $in: ["REJECTED", "rejected"] }, 
    }).sort({ lastName: 1 }); 

    if (!findRejected) {
      return res
        .status(404)
        .json({ message: "There are no rejected applications as of now." });
    }

    return res.status(200).json({
      message: "Rejected records retrieved successfully.",
      data: findRejected,
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});

const getAllPending = asyncHandler(async (req, res) => {
  try {
    // const findPending = await StudentApplication.find({
    //   status: "PENDING" || "pending",
    // });
    const findPending = await StudentApplication.find({
      status: { $in: ["PENDING", "pending"] }, 
    }).sort({ lastName: 1 }); 

    if (!findPending) {
      res
        .status(404)
        .json({ message: "There are no pending applications right now." });
    }
    res.status(200).json({
      message: "Pending records retrieved successfully. ",
      data: findPending,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const getAllApplications = asyncHandler(async (req, res) => {
  try {
    const allApplications = await StudentApplication.find({})
    .sort({ lastName: 1 }); 

    if (!allApplications || allApplications.length === 0) {
      return res.status(404).json({ message: "No applications found." });
    }
    res.status(200).json({
      message: "All applications retrieved successfully.",
      data: allApplications,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const createClassroom = asyncHandler(async (req, res) => {
  try {
    const { schoolYear, semester, sectionName, gradeLevel, adviser, strand } = req.body;

    const existingClass = await Classroom.findOne({ sectionName, adviser });

    if (existingClass) {
      return res
        .status(400)
        .json({ message: "A class with this name has already been created." });
    }

    const classroom = new Classroom({
      schoolYear,
      semester,
      sectionName,
      gradeLevel,
      adviser,
      strand,
    });

    await classroom.save();

    return res.status(201).json({ message: "Class has been created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const getSpecificClass = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const findClass = await Classroom.findOne({ _id: id });

    if (!findClass) {
      return res.status(404).json({ message: "Class not found." });
    }

    return res.status(200).json({
      message: "Class found",
      data: findClass,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const getAllClasses = asyncHandler(async (req, res) => {
  try {
    // Retrieve classes from the database and sort them by sectionName in ascending order
    const retrieveClasses = await Classroom.find().sort({ sectionName: 1 });

    if (!retrieveClasses) {
      return res.status(404).json({ message: "There are nothing here." });
    }

    return res.status(200).json({
      message: "Classes has been found",
      data: retrieveClasses,
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});

const updateClassroom = asyncHandler(async (req, res) => {
  try {
    const { sectionName, adviser, strand } = req.body;

    const updatedClass = await Classroom.findOneAndUpdate(
      { sectionName },
      { adviser, strand },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found." });
    }

    return res.status(200).json({
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteClassroom = asyncHandler(async (req, res) => {
  try {
    const { sectionId } = req.params;

    const deletedClassroom = await Classroom.findByIdAndDelete(sectionId);

    if (!deletedClassroom) {
      return res
        .status(404)
        .json({ message: "We couldn't find a section with this ID." });
    }

    return res.status(202).json({ message: "Section has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});


const createClassAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, classId } = req.body;

    const createdBy =
      req.user && req.user.username ? req.user.username : "admin";

    const isValidClassId = await Classroom.findById(classId);

    if (!isValidClassId) {
      return res.status(400).json({ message: "Invalid classId provided." });
    }

    const announcement = new Announcement({
      title,
      content,
      createdBy,
      class: classId,
    });

    await announcement.save();

    // Get student email addresses by classId
    // const studentEmails = await Student.find({ class: classId }).select('emailAddress').exec();

    // Send emails to students in the specified class

    res.status(201).json({
      message: "Announcement created successfully.",
      data: announcement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// creating an announcement for the school
const createSchoolAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, typeOfAnnouncement } = req.body;

    const createdBy =
      req.user && req.user.username ? req.user.username : "admin";

    const announcement = new Announcement({
      title,
      content,
      createdBy,
      typeOfAnnouncement,
      isPublic: true,
    });

    await Announcement.insertMany([announcement]);

    // const studentEmails = await Student.find({}).distinct("emailAddress");
    // const teacherEmails = await Teacher.find({}).distinct("emailAddress");
    // const adminEmails = await Admin.find({}).distinct("emailAddress");

    // const allEmails = [...studentEmails, ...teacherEmails, ...adminEmails];

    // const mailOptions = {
    //   from: "mrmnhs.simsannouncement@gmail.com",
    //   subject: `New School Announcement: ${typeOfAnnouncement || "General"}`,
    //   // Use HTML content for the email body
    //   html: `
    //     <html>
    //     <head>
    //     </head>
    //       <body>
    //         <h2>${title}</h2>
    //         <p>${content}</p>
    //         <p>Created By: ${createdBy}</p>
    //         <p>Type of Announcement: ${
    //           typeOfAnnouncement || "Important Announcement"
    //         }</p>
    //       </body>
    //     </html>
    //   `,
    // };

    // await Promise.all(
    //   allEmails.map(async (email) => {
    //     try {
    //       const personalizedMailOptions = {
    //         ...mailOptions,
    //         to: email,
    //       };

    //       await transporter.sendMail(personalizedMailOptions);

    //       console.log(`personalizedMailOptions`, personalizedMailOptions)
    //       console.log(`Email sent successfully to ${email}`);
    //     } catch (error) {
    //       console.error(`Error sending email to ${email}, ${error}`);
    //     }
    //   })
    // );

    res.status(201).json({
      message: "Announcement created successfully.",
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// UPDATE A SCHOOL ANNOUNCEMENT

const updateSchoolAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, typeOfAnnouncement } = req.body;

    const updatedBy =
      req.user && req.user.username ? req.user.username : "Admin";

    const updatedAnnouncement = await Announcement.findOneAndUpdate(
      { title, content },
      updatedAnnouncement,
      { new: true }
    );

    const studentEmails = await Student.find({}).distinct("emailAddress");
    const teacherEmails = await Teacher.find({}).distinct("emailAddress");
    const adminEmails = await Admin.find({}).distinct("emailAddress");

    const allEmails = [...studentEmails, ...teacherEmails, ...adminEmails];

    const mailOptions = {
      from: "mrmnhs.simsannouncement@gmail.com",
      subject: `School Announcement ${
        typeOfAnnouncement || "Important Announcement"
      }`,
      text: `Title: ${title}\nContent: ${content}`,
    };

    for (const email of allEmails) {
      mailOptions.to = email;

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
      } catch (error) {
        console.error(error);
      }
    }

    res.status(200).json({
      message: "Announcement has been successfully updated.",
      data: updatedAnnouncement,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// DELETE SCHOOL ANNOUNCEMENTS

const deleteSchoolAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    const deletedAnnouncement = await Announcement.findOneAndDelete(title);

    if (!deletedAnnouncement) {
      return res
        .status(404)
        .json({ message: "There is no announcement with that title." });
    }

    res.status(202).json({ message: "Announcement has been deleted" });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

//post faculty announcement only
const createFacultyAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, typeOfAnnouncement } = req.body;

    const facultyAnnouncement = new Announcement({
      title,
      content,
      createdBy,
      typeOfAnnouncement,
    });

    await Announcement.insertMany([facultyAnnouncement]);

    const teacherEmails = await Teacher.find({}).distinct("emailAddress");

    const mailOptions = {
      from: "mrmnhs.simsannouncement@gmail.com",
      subject: `New School Announcement ${
        typeOfAnnouncement || "Important Announcement"
      }`,
      content: { generateEmailTemplate },
    };

    await Promise.all(
      teacherEmails.map(async (email) => {
        try {
          const personalizedMailOptions = {
            ...mailOptions,
            to: email,
          };

          await transporter.sendMail(personalizedMailOptions);
          console.log(
            `Email has been sent successfully to all faculty personnel's ${email}`
          );
        } catch (error) {
          console.error(`Error sending email to ${email}, ${error}`);
        }
      })
    );

    res.status(201).json({
      message: "Announcement created successfully.",
      data: facultyAnnouncement,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// update faculty announcement only
const updateFacultyAnnouncement = asyncHandler(async (res, req) => {
  try {
    const { title, content, typeOfAnnouncement } = req.body;

    const updatedAnnouncement = await Announcement.findOneAndUpdate(
      { title, content },
      updatedAnnouncement,
      { new: true }
    );

    const facultyEmails = await Teacher.find({}).distinct("emailAddress");
    const adminEmails = await Admin.find({}).distinct("emailAddress");

    const allEmails = [...facultyEmails, ...adminEmails];

    const mailOptions = {
      from: "mrmnhs.simsannouncement@gmail.com",
      subject: `School Announcement ${
        typeOfAnnouncement || "Important Announcement"
      }`,
      text: `Title ${title}\nContent: ${content}`,
    };

    for (const email of allEmails) {
      mailOptions.to = email;

      try {
        await transporter.sendEmail(emailOptions);
        console.log(`Email has been sent successfully to ${email}`);
      } catch (error) {
        console.error(error);
      }

      res.status(200).json({
        message: "Announcement has been successfully updated.",
        data: updatedAnnouncement,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// delete faculty announcement
const deleteFacultyAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    const deletedAnnouncement = await Announcement.findOneAndDelete(title);

    if (!deletedAnnouncement) {
      return res
        .status(404)
        .json({ message: "There is no announcement with that title." });
    }

    res.status(202).json({ message: "Announcement has been deleted." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// GET ALL SCHOOL ANNOUNCEMENTS
// FOR SUPERADMIN ACCOUNTS
const getAllSchoolAnnouncements = asyncHandler(async (req, res) => {
  try {
    const retrieveAnnouncements = await Announcement.find();

    if (!retrieveAnnouncements) {
      res.status(404).json({ message: "There are no announcements." });
    }

    res.status(200).json({
      message: "All Announcement retrieved successfully.",
      data: retrieveAnnouncements,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const assignTeacherToClass = asyncHandler(async (req, res) => {
  try {
    const { teacherName, sectionName, subject } = req.body;

    const [firstName, lastName] = teacherName.split(" ");

    const existingClassroom = await Classroom.findOne({ sectionName });

    // const existingTeacher = existingClassroom.subjectTeachers.find((teacher) => teacher.firstName === firstName && teacher.lastName === lastName)

    if (existingTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher is already been assigned to this class." });
    }

    const teacherRecord = await Teacher.findOne({ firstName, lastName });

    if (!teacherRecord) {
      return res
        .status(404)
        .json({ message: "Teacher not found in the teacher records." });
    }

    existingClassroom.subjectTeachers.push({ firstName, lastName, subject });

    await existingClassroom.save();

    return res.status(200).json({ message: "Teacher has been assigned." });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});

// const updateStudentProfile = asyncHandler(async (req, res) => {
//   try {
//     const { lrn } = req.body;

//     const student = await Student.findByIdAndUpdate({ lrn }, { new: true });

//     if (!student) {
//       res.status(404).json({
//         message: "The student that your about to edit is not enrolled yet.",
//       });
//     }

//     res.status(200).json({
//       message: "Student information has been updated.",
//       data: student,
//     });
//   } catch (error) {
//     res.status(500).json({ message: `${error}` });
//   }
// });

const getAnnouncements = asyncHandler(async (req, res) => {
  try {
    const { username } = req.user;

    const announcements = await Announcement.find({
      $or: [{ isPublic: true }, { createdBy: username }],
    })
      .sort({ createdAt: -1 })
      .populate("class", "sectionName");

    res.status(200).json({
      message: "Announcements retrieved successfully",
      data: announcements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

const getAllTeachersAccount = asyncHandler(async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";

    if (!isAdmin) {
      return res
        .status(403)
        .json({
          message:
            "Forbidden: You do not have permission to perform this action.",
        });
    }

    const allTeachers = await Teacher.find().sort({ lastName: 1 });

    res.status(200).json({
      message: "The teachers' data retrieved successfully",
      data: allTeachers,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});


const updateAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { announcementId, title, content } = req.body;
    const isAdminOrTeacher = req.user.role === "admin" || req.user.role === "teacher";

    if (!isAdminOrTeacher) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to perform this action.",
      });
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      { title, content },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({
        message: "Announcement not found.",
      });
    }

    res.status(200).json({
      message: "Announcement has been successfully updated.",
      data: updatedAnnouncement,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});


const deleteAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { announcementId } = req.body;

    const deletedAnnouncement = await Announcement.findOneAndDelete({
      _id: announcementId,
    });

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'There is no announcement with that ID.' });
    }

    res.status(202).json({ message: 'Announcement has been deleted.' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});


const getTotalStudents = asyncHandler(async (req,res) => {
  try {
    const totalStudents = await Student.countDocuments();
    res.json({totalStudents})
    
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTotalTeachers = asyncHandler(async (req,res) => {
  try {
    
    const totalTeachers = await Teacher.countDocuments();
    res.json({totalTeachers});
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTotalMaleStudents = asyncHandler(async (req,res) => {
  try {

    // await check('gender').equals('MALE').run(req);

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(400).json({errors: errors.array()});
    // }


    // const { gender } = req.query;

    // console.log(gender)


    // const totalMaleStudents = await Student.countDocuments({gender});
    const totalMaleStudents = await Student.countDocuments({gender: 'MALE'});
    res.json({totalMaleStudents});
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTotalFemaleStudents = asyncHandler(async (req,res) => {
 try {

    const totalFemaleStudents = await Student.countDocuments({gender: 'FEMALE'});
    res.json({totalFemaleStudents});
    
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})

// get total students in the academic track
const getTotalAcadTrack = asyncHandler(async (req,res) => {
  try {

    const totalStudentsAcadTrack = await Student.countDocuments({track: 'ACADEMIC'})
    res.json({totalStudentsAcadTrack})
    
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTotalTVLTrack = asyncHandler(async (req,res) => {
  try {
    const totalStudentsTVLTrack = await Student.countDocuments({track: 'TVL'});
    res.json({totalStudentsTVLTrack});
  } catch (error) {
    res.status(500).json({message: `${error}`});
  }
})


const getTotalStudentsInABM = asyncHandler(async (req,res) => {
  try {

    const totalABMStudents = await Student.countDocuments({strand: 'ABM'});
    res.json({totalABMStudents});
    
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTotalStudentsInSTEM = asyncHandler(async (req,res) => {
  try {
    
    const totalSTEMStudents = await Student.countDocuments({strand: 'STEM'});
    res.json({totalSTEMStudents});
    
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTotalStudentsInHUMSS = asyncHandler(async (req,res) => {
  try {

    const totalHumssStudents = await Student.countDocuments({strand: 'HUMSS'})
    res.json({totalHumssStudents})
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})

const getTotalStudentsInICT = asyncHandler(async (req,res) => {
  try {

    const totalICTStudents = await Student.countDocuments({strand: 'ICT'});
    res.json({totalICTStudents});
    
  } catch (error) {
    res.status(500).json({message: `${error}`})
  }
})


const getTotalStudentsInHE = asyncHandler(async (req,res) => {
  try {

    const totalHEStudents = await Student.countDocuments({strand: 'HE'});

    res.json({totalHEStudents})
    
  } catch (error) {
    res.status(500).json({message: `${error}}`})
  }
})


const updateAdminPassword = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(_id);

    if (!(await bcryptjs.compare(currentPassword, admin.password))) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to change password." });
  }
});



const getAllAnalytics = asyncHandler(async (req, res) => {
  try {
    const globalSettings = await GlobalSettings.findOne().exec();
    const currentSchoolYear = globalSettings.schoolYear;
    const currentSemester = globalSettings.semester;

    const previousSemester =
      currentSemester === "first semester"
        ? "second semester"
        : "first semester";
    const previousSchoolYear =
      currentSemester === "first semester"
        ? String(Number(currentSchoolYear) - 1)
        : currentSchoolYear;

    console.log(`previousSchoolYear`, previousSchoolYear);

    const totalTeachers = await Teacher.countDocuments({});
    const totalAdmins = await Admin.countDocuments({});

    // Count students based on current school year and semester
    const totalStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
    });
    const totalMaleStudents = await Student.countDocuments({
      gender: "MALE",
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
    });
    const totalFemaleStudents = await Student.countDocuments({
      gender: "FEMALE",
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
    });
    const totalAcadStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
      "schoolYear.track": "ACADEMIC",
    });
    const totalTVLStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
      "schoolYear.track": "TVL",
    });
    const totalABMStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
      "schoolYear.strand": "ABM",
    });
    const totalSTEMStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
      "schoolYear.strand": "STEM",
    });
    const totalHumssStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
      "schoolYear.strand": "HUMSS",
    });
    const totalICTStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
      "schoolYear.strand": "ICT",
    });
    const totalHEStudents = await Student.countDocuments({
      "schoolYear.year": currentSchoolYear,
      "schoolYear.semester": currentSemester,
      "schoolYear.strand": "HE",
    });
    

    // Fetching students where the current school year and semester match
    const currentSemesterStudents = await Student.find({
      "schoolYear": {
        $elemMatch: {
          "year": currentSchoolYear,
          "semester": currentSemester
        }
      }
    }).exec();

    // Extracting the schoolYear object that matches the current semester
    const currentSemesterSchoolYears = currentSemesterStudents.map(student => {
      return student.schoolYear.find(year => year.year === currentSchoolYear && year.semester === currentSemester);
    });


    console.log(`currentSemesterSchoolYears`,currentSemesterSchoolYears)

    // Counting grade 11 and grade 12 students within the current semester schoolYear objects
    const totalGrade11Students = currentSemesterSchoolYears.filter(
      schoolYear => schoolYear.gradeLevel === 11
    ).length;

    console.log(`totalGrade11Students`, totalGrade11Students)

    const totalGrade12Students = currentSemesterSchoolYears.filter(
      schoolYear => schoolYear.gradeLevel === 12
    ).length;


    const calculatePercentageChange = async (current, previous) => {
      const currentCount = await current;
      const previousCount = await previous;
      return ((currentCount - previousCount) / previousCount) * 100;
    };

    const totalStudentsPercentage = await calculatePercentageChange(
      totalStudents,
      Student.countDocuments({
        "schoolYear.year": previousSchoolYear,
        "schoolYear.semester": previousSemester,
      })
    );

    const totalMaleStudentsPercentage = await calculatePercentageChange(
      totalMaleStudents,
      Student.countDocuments({
        gender: "MALE",
        "schoolYear.year": previousSchoolYear,
        "schoolYear.semester": previousSemester,
      })
    );

    const totalFemaleStudentsPercentage = await calculatePercentageChange(
      totalFemaleStudents,
      Student.countDocuments({
        gender: "FEMALE",
        "schoolYear.year": previousSchoolYear,
        "schoolYear.semester": previousSemester,
      })
    );

    const totalAcadStudentsPercentage = await calculatePercentageChange(
      totalAcadStudents,
      Student.countDocuments({
        "schoolYear.year": previousSchoolYear,
        "schoolYear.semester": previousSemester,
        "schoolYear.track": "ACADEMIC",
      })
    );

    const totalTVLStudentsPercentage = await calculatePercentageChange(
      totalTVLStudents,
      Student.countDocuments({
        "schoolYear.year": previousSchoolYear,
        "schoolYear.semester": previousSemester,
        "schoolYear.track": "TVL",
      })
    );

    const teacherDistribution = await Teacher.aggregate([
      {
        $match: {
          $or: [
            { designation: { $in: ["TEACHER I", "TEACHER II", "TEACHER III", "MASTER TEACHER I", "MASTER TEACHER II", "MASTER TEACHER III"] } },
            { designation: { $exists: false } },
            { designation: { $eq: "" } }
          ]
        }
      },
      {
        $group: {
          _id: "$designation",
          total: { $sum: 1 },
          male: { $sum: { $cond: [{ $eq: ["$gender", "MALE"] }, 1, 0] } },
          female: { $sum: { $cond: [{ $eq: ["$gender", "FEMALE"] }, 1, 0] } }
        }
      }
    ]);
    
    const adminDistribution = await Admin.aggregate([
      {
        $match: {
          $or: [
            { designation: { $in: ["TEACHER I", "TEACHER II", "TEACHER III", "MASTER TEACHER I", "MASTER TEACHER II", "MASTER TEACHER III"] } },
            { designation: { $exists: false } },
            { designation: { $eq: "" } }
          ]
        }
      },
      {
        $group: {
          _id: "$designation",
          total: { $sum: 1 },
          male: { $sum: { $cond: [{ $eq: ["$gender", "MALE"] }, 1, 0] } },
          female: { $sum: { $cond: [{ $eq: ["$gender", "FEMALE"] }, 1, 0] } }
        }
      }
    ]);
    
    // Combine teacher and admin distributions
    const combinedDistribution = {};
    
    teacherDistribution.forEach(entry => {
      const { _id, total, male, female } = entry;
      if (!combinedDistribution[_id]) {
        combinedDistribution[_id] = { total, male, female };
      } else {
        combinedDistribution[_id].total += total;
        combinedDistribution[_id].male += male;
        combinedDistribution[_id].female += female;
      }
    });
    
    adminDistribution.forEach(entry => {
      const { _id, total, male, female } = entry;
      if (!combinedDistribution[_id]) {
        combinedDistribution[_id] = { total, male, female };
      } else {
        combinedDistribution[_id].total += total;
        combinedDistribution[_id].male += male;
        combinedDistribution[_id].female += female;
      }
    });
    
    // Convert combinedDistribution to an array
    const combinedDistributionArray = Object.entries(combinedDistribution).map(([designation, { total, male, female }]) => ({
      _id: designation,
      total,
      male,
      female
    }));
  
      // Count male and female students per strand
      const maleFemalePerStrand = await Student.aggregate([
        {
          $match: {
            "schoolYear.year": currentSchoolYear,
            "schoolYear.semester": currentSemester,
          }
        },
        {
          $group: {
            _id: "$schoolYear.strand",
            MALE: { $sum: { $cond: [{ $eq: ["$gender", "MALE"] }, 1, 0] } },
            FEMALE: { $sum: { $cond: [{ $eq: ["$gender", "FEMALE"] }, 1, 0] } }
          }
        },
        {
          $group: {
            _id: "$_id", // Group by unique strand ID
            MALE: { $sum: "$MALE" }, // Sum the male count for each strand
            FEMALE: { $sum: "$FEMALE" }, // Sum the female count for each strand
          }
        }
      ]);
      


      
  

    res.json({
      students: {
        totalStudents,
        totalStudentsPercentage,
        totalMaleStudents,
        totalMaleStudentsPercentage,
        totalFemaleStudents,
        totalFemaleStudentsPercentage,
        totalAcadStudents,
        totalAcadStudentsPercentage,
        totalTVLStudents,
        totalTVLStudentsPercentage,
        totalABMStudents,
        totalSTEMStudents,
        totalHumssStudents,
        totalICTStudents,
        totalHEStudents,
        maleFemalePerStrand,
        totalGrade11Students,
        totalGrade12Students,
      },
      faculty: {
        totalTeachers,
        totalAdmins,
        distribution: combinedDistribution
      },
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});





const resetTeacherPassword = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    teacher.password = bcryptjs.hashSync(teacher.birthDate, 10); 

    await teacher.save();

    res.status(200).json({ message: "Teacher password reset successfully." });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});


const resetAdminPassword = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.password = bcryptjs.hashSync(admin.birthDate, 10); 
    await admin.save();

    res.status(200).json({ message: "Admin password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});


const resetStudentPassword = asyncHandler(async (req, res) => {
  try {
    const { lrn } = req.body;

    const student = await Student.findOne({ lrn });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.password = bcryptjs.hashSync(student.birthDate, 10); 
    await student.save();

    res.status(200).json({ message: "Student password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});


const getAllStudentsAccounts = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find({}, 'firstName lastName lrn');

    const formattedStudents = students.map(student => ({
      _id: student._id,
      fullName: `${student.lastName}, ${student.firstName}`,
      lrn: student.lrn
    }));

    formattedStudents.sort((a, b) => a.fullName.localeCompare(b.fullName));

    res.status(200).json({
      message: "All students' accounts retrieved successfully.",
      data: formattedStudents,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});


const getAllTeachersAccounts = asyncHandler(async (req, res) => {
  try {
    const teachers = await Teacher.find({}, 'firstName lastName username');

    const formattedTeachers = teachers.map(teacher => ({
      _id: teacher._id,
      fullName: `${teacher.lastName}, ${teacher.firstName}`,
      username: teacher.username
    }));

    formattedTeachers.sort((a, b) => a.fullName.localeCompare(b.fullName));

    res.status(200).json({
      message: "All teachers' accounts retrieved successfully.",
      data: formattedTeachers,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});



const getAllAdminsAccounts = asyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find({}, 'firstName lastName username');

    const formattedAdmins = admins.map(admin => ({
      _id: admin._id,
      fullName: `${admin.lastName}, ${admin.firstName}`,
      username: admin.username
    }));

    formattedAdmins.sort((a, b) => a.fullName.localeCompare(b.fullName));

    res.status(200).json({
      message: "All admins' accounts retrieved successfully.",
      data: formattedAdmins,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});



const getGlobalSettings = async (req, res) => {
  try {
    const globalSettings = await GlobalSettings.findOne();

    if (!globalSettings) {
      return res.status(404).json({ message: 'Global settings not found' });
    }

    res.status(200).json(globalSettings);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving global settings: ${error.message}` });
  }
};



const updateGlobalSettings = async (req, res) => {
  try {
    const { schoolYear, semester, isGlobalGradesEncodingEnabled } = req.body;

    let globalSettings = await GlobalSettings.findOne();

    if (!globalSettings) {
      globalSettings = new GlobalSettings({
        schoolYear,
        semester,
        isGlobalGradesEncodingEnabled
      });
    } else {
      globalSettings.schoolYear = schoolYear;
      globalSettings.semester = semester;
      globalSettings.isGlobalGradesEncodingEnabled = isGlobalGradesEncodingEnabled;
      
    }

    await globalSettings.save();

    res.status(200).json({ message: 'Global settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error updating global settings: ${error.message}` });
  }
};



const getStudentsInSpecificClass = async (req, res) => {
  try {
    const { sectionId } = req.body;

    // Find the classroom with the given sectionId
    const classroom = await Classroom.findById(sectionId);

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found.' });
    }

    // Extract LRNs of students in the classroom
    const lrns = classroom.students.map(student => student.lrn);
    // console.log(lrns)

    // Find students based on LRNs within the specified school year and semester
    const students = await Student.find({ lrn: { $in: lrns } }).sort({ lastName: 1 });
    // console.log(students)

    // Return the sorted students
    return res.status(200).json({ message: 'Students retrieved successfully.', students });
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving students: ${error}` });
  }
};


const getStudentsInClassAndHaveNoClass = async (req, res) => {
  try {
    const { sectionId } = req.body;

   // Find the classroom with the given sectionId
   const classroom = await Classroom.findById(sectionId);
   const sectionSchoolYear = classroom.schoolYear;
   const sectionSemester = classroom.semester;
   const sectionGradeLevel = classroom.gradeLevel;
   const sectionStrand = classroom.strand;


   if (!classroom) {
     return res.status(404).json({ message: 'Classroom not found.' });
   }

   // Extract LRNs of students in the classroom
   const lrns = classroom.students.map(student => student.lrn);

   // Find students based on LRNs within the specified school year and semester
   const studentsInSection = await Student.find({ lrn: { $in: lrns } });


    // Find students with no class for the specified school year and semester
    const studentsWithNoClass = await Student.find({
      'schoolYear.year': sectionSchoolYear,
      'schoolYear.semester': sectionSemester,
      'schoolYear.gradeLevel': sectionGradeLevel,
      'schoolYear.strand': sectionStrand,
      'schoolYear.sectionName': "",
    }).sort({ lastName: 1 });

    // Merge the two arrays of students
    const mergedStudents = [...studentsInSection, ...studentsWithNoClass];

    // Return the merged and sorted students
    return res.status(200).json({ message: 'Students retrieved successfully.', students: mergedStudents });
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving students: ${error}` });
  }
};



const archiveStudent = asyncHandler(async (req, res) => {
  try {
    const { studentId } = req.params;
    const { remarks } = req.body; // Assuming remarks are sent in the request body

    // Check if the student exists
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Create a new archived student document with the same fields as the student
    const archivedStudent = new ArchivedStudent({
      ...student.toObject(), // Copy all fields from the existing student
      archivedRemarks: remarks, // Add the archivedRemarks field
      archivedTimestamp: new Date(), // Add the archivedTimestamp field with the current date and time
    });

    // Save the archived student document
    await archivedStudent.save();

    // Remove the student document from the Student collection
    await Student.findByIdAndDelete(studentId);

    res.status(200).json({ message: "Student archived successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});




const unarchiveStudent = asyncHandler(async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if the archived student exists
    const archivedStudent = await ArchivedStudent.findById(studentId);

    if (!archivedStudent) {
      return res.status(404).json({ message: "Archived student not found" });
    }

    // Create a new student document with the same fields as the archived student
    const student = new Student({
      ...archivedStudent.toObject(), // Copy all fields from the archived student
    });

    // Save the student document to the EnrollStudent collection
    await student.save();
    
    // Remove the archived student document from the ArchivedStudent collection
    await ArchivedStudent.findByIdAndDelete(studentId);
    
    res.status(200).json({ message: "Student unarchived successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});



const getAllArchivedStudents = asyncHandler(async (req, res) => {
  try {
    const archivedStudents = await ArchivedStudent.find();

    // if (!archivedStudents || archivedStudents.length === 0) {
    //   return res.status(404).json({ message: 'No archived students found' });
    // }
    
    res.status(200).json({ message: 'Archived students retrieved successfully', data: archivedStudents });
  } catch (error) {
    console.error('Error retrieving archived students:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const deleteArchivedStudent = asyncHandler(async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await ArchivedStudent.findOneAndDelete({ _id: studentId});

    if (!student) {
      return res.status(404).json({ message: 'Student not found in the archive.' });
    }

    // If the student is found and deleted successfully
    return res.status(200).json({ message: 'Student account deleted successfully' });
  }  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the student from the archive.' });
  }
});





const archiveTeacher = asyncHandler(async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { remarks } = req.body; // Assuming remarks are sent in the request body

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Create a new archived teacher document with the same fields as the teacher
    const archivedTeacher = new ArchivedTeacher({
      ...teacher.toObject(), // Copy all fields from the existing teacher
      archivedRemarks: remarks, // Add the archivedRemarks field
      archivedTimestamp: new Date(), // Add the archivedTimestamp field with the current date and time
    });

    // Save the archived teacher document
    await archivedTeacher.save();

    // Remove the teacher document from the Teacher collection
    await Teacher.findByIdAndDelete(teacherId);

    res.status(200).json({ message: "Teacher archived successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});




const getAllArchivedTeachers = asyncHandler(async (req, res) => {
  try {
    const archivedTeachers = await ArchivedTeacher.find();

    // if (!archivedTeachers || archivedTeachers.length === 0) {
    //   return res.status(404).json({ message: 'No archived teachers found' });
    // }
    
    res.status(200).json({ message: 'Archived teachers retrieved successfully', data: archivedTeachers });
  } catch (error) {
    console.error('Error retrieving archived teachers:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const unarchiveTeacher = asyncHandler(async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Check if the archived teacher exists
    const archivedTeacher = await ArchivedTeacher.findById(teacherId);

    if (!archivedTeacher) {
      return res.status(404).json({ message: "Oops! Couldn't find the archived teacher." });
    }

    // Create a new teacher document with the same fields as the archived techer
    const teacher = new Teacher({
      ...archivedTeacher.toObject(), // Copy all fields from the archived teacher
    });

    // Save the teacher document to the teachers collection
    await teacher.save();
    
    // Remove the archived teacher document from the ArchivedTeachers collection
    await ArchivedTeacher.findByIdAndDelete(teacherId);
    
    res.status(200).json({ message: "Teacher unarchived successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});




const deleteArchivedTeacher = asyncHandler(async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await ArchivedTeacher.findOneAndDelete({ _id: teacherId});

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found in the archive.' });
    }

    // If the teacher is found and deleted successfully
    return res.status(200).json({ message: 'Teacher account deleted successfully' });
  }  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the teacher from the archive.' });
  }
});






const archiveAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;
    const { remarks } = req.body; // Assuming remarks are sent in the request body

    // Check if the admin exists
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

     // Get the ID of the admin making the request
     const requestingAdminId = req.user._id; // Assuming the user ID is stored in req.user.id
     console.log(requestingAdminId)

     // Check if the admin making the request is trying to archive themselves
     if (adminId === requestingAdminId) {
      return res.status(400).json({ message: "Oops! You can't archive yourself" });
     }

    // Create a new archived admin document with the same fields as the admin
    const archivedAdmin = new ArchivedAdmin({
      ...admin.toObject(), // Copy all fields from the existing admin
      archivedRemarks: remarks, // Add the archivedRemarks field
      archivedTimestamp: new Date(), // Add the archivedTimestamp field with the current date and time
    });

    // Save the archived admin document
    await archivedAdmin.save();

    // Remove the admin document from the Admin collection
    await Admin.findByIdAndDelete(adminId);

    res.status(200).json({ message: "Admin archived successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});



const getAllArchivedAdmins = asyncHandler(async (req, res) => {
  try {
    const archivedAdmins = await ArchivedAdmin.find();

    // if (!archivedAdmins || archivedAdmins.length === 0) {
    //   return res.status(404).json({ message: 'No archived admins found' });
    // }
    
    res.status(200).json({ message: 'Archived admins retrieved successfully', data: archivedAdmins });
  } catch (error) {
    console.error('Error retrieving archived admins:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const unarchiveAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;

    // Check if the archived admin exists
    const archivedAdmin = await ArchivedAdmin.findById(adminId);

    if (!archivedAdmin) {
      return res.status(404).json({ message: "Archived admin not found" });
    }

    // Create a new admin document with the same fields as the archived admin
    const admin = new Admin({
      ...archivedAdmin.toObject(), // Copy all fields from the archived admin
    });

    // Save the admin document to the admin collection
    await admin.save();
    
    // Remove the archived admin document from the ArchivedTeachers collection
    await ArchivedAdmin.findByIdAndDelete(adminId);
    
    res.status(200).json({ message: "Admin unarchived successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});



const deleteArchivedAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await ArchivedAdmin.findOneAndDelete({ _id: adminId});

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found in the archive.' });
    }

    // If the admin is found and deleted successfully
    return res.status(200).json({ message: 'Admin account deleted successfully' });
  }  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the admin from the archive.' });
  }
});




const getStudentByLrn = asyncHandler(async (req, res) => {
  try {
    const { lrn } = req.params;

    const retrieveSpecificStudent = await Student.findOne({ lrn });

    if (!retrieveSpecificStudent) {
      return res.status(404).json({ message: "There is no student with this LRN." });
    }

    return res.status(200).json({
      message: "Student retrieved successfully.",
      data: retrieveSpecificStudent,
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});




const updateSection = asyncHandler(async (req, res) => {
  try {
    const { sectionName, gradeLevel, adviser, strand } = req.body;
    const { sectionId } = req.params;

    const existingClass = await Classroom.findById(sectionId);

    if (!existingClass) {
      return res
        .status(404)
        .json({ success: false, message: "Section not found." });
    }

    const existingSection = await Classroom.findOne({ sectionName, adviser });

    if (existingSection && existingSection._id.toString() !== sectionId) {
      return res
        .status(400)
        .json({ success: false, message: "A class with this name and teacher combination already exists." });
    }

    existingClass.sectionName = sectionName;
    existingClass.gradeLevel = gradeLevel;
    existingClass.adviser = adviser;
    existingClass.strand = strand;

    await existingClass.save();

    return res.status(200).json({ success: true, message: "Section has been updated." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});








module.exports = {
  getAllAdmins,
  createAdmin,
  adminLogin,
  updateAdmin,
  updateAdminProfile,
  deleteAdmin,
  getSpecificAdmin,
  getAdminProfile,
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
  getAllApproved,
  getAllPending,
  getAllRejected,
  getAllApplications,
  createClassAnnouncement,
  createSchoolAnnouncement,
  updateSchoolAnnouncement,
  deleteSchoolAnnouncement,
  getAllSchoolAnnouncements,
  createFacultyAnnouncement,
  updateFacultyAnnouncement,
  deleteFacultyAnnouncement,
  createClassroom,
  getAllClasses,
  getSpecificClass,
  updateClassroom,
  deleteClassroom,
  assignTeacherToClass,
  getAnnouncements,
  getAllTeachersAccount,
  updateAnnouncement,
  deleteAnnouncement,
  getTotalStudents,
  getTotalTeachers,
  getTotalMaleStudents,
  getTotalFemaleStudents,
  getTotalAcadTrack,
  getTotalTVLTrack,
  getTotalStudentsInABM,
  getTotalStudentsInSTEM,
  getTotalStudentsInHUMSS,
  getTotalStudentsInICT,
  getTotalStudentsInHE,
  getAllAnalytics,
  updateAdminPassword,
  resetTeacherPassword,
  resetAdminPassword,
  resetStudentPassword,
  getAllStudentsAccounts,
  getAllTeachersAccounts,
  getAllAdminsAccounts,
  getGlobalSettings,
  updateGlobalSettings,
  getStudentsInSpecificClass,
  getStudentsInClassAndHaveNoClass,
  archiveStudent,
  unarchiveStudent,
  getAllArchivedStudents,
  deleteArchivedStudent,
  archiveTeacher,
  getAllArchivedTeachers,
  unarchiveTeacher,
  deleteArchivedTeacher,
  archiveAdmin,
  getAllArchivedAdmins,
  unarchiveAdmin,
  deleteArchivedAdmin,
  getStudentByLrn,
  updateSection,
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
