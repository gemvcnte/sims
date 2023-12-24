const { Teacher } = require("../models/TeacherModel");
const { Student } = require("../models/StudentModel");
const { Classroom } = require("../models/ClassroomModel");
const { Announcement } = require("../models/Announcement");
const { Schedule } = require("../models/ScheduleModel");
const asyncHandler = require("express-async-handler");
const generateAuthToken = require("../configs/auth");
const bcryptjs = require("bcryptjs");
const { transporter } = require("../mailer");

//
const teacherLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    // finding teacher base sa uname
    const teacher = await Teacher.findOne({ username });

    // check if the teacher exists
    if (!teacher) {
      res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcryptjs.compare(password, teacher.password);

    // Check if the passwords match
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid username or password" });
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
    console.error(
      `There is an error Internal server error. Please try again later.`
    );
    res.status(500).json({ message: "Login failed." });
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
    res
      .status(500)
      .json({ message: `Internal server error. Please try again later.` });
  }
});

const getEnrolledStudents = asyncHandler(async (req, res) => {
  try {
    const findStudents = await Student.find(
      {},
      "firstName lastName emailAddress"
    );

    if (!findStudents.length) {
      res.status(404).json({ message: "There are no students enrolled." });
    } else {
      res.status(200).json({ message: "Students found.", data: findStudents });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

//
const updateTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const updatedProfileData = req.body;

    // Check if the user making the request matches the user ID in the updatedProfileData
    if (_id !== updatedProfileData._id) {
      res.status(403).json({
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
      res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json({
      message: "Teacher profile updated successfully.",
      teacherData: teacherProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error. Please try again later.` });
  }
});

const getTeacherSchedule = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const teacherSchedule = await Teacher.findById(_id);

    const schedule = await Schedule.find();

    res.status(200).json({ message: "Teacher Schedule has been retrieved." });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error. Please try again later.` });
  }
});

// Teacher Post Class Announcement on the specific
const postClassAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, typeOfAnnouncement } = req.body;
    const createdBy =
      req.user && req.user.username ? req.user.username : `Teacher ${username}`;

    const announcement = new Announcement({
      title,
      content,
      createdBy,
      typeOfAnnouncement,
    });

    const studentEmailsOnClassroom = await Classroom.find(students).distinct(
      "emailAddress"
    );

    const studentEmails = [...studentEmailsOnClassroom];

    const mailOptions = {
      from: "mrmnhs.simsannouncement@gmail.com",
      subject: `New Class Announcement ${typeOfAnnouncement}`,
      text: `Title: ${title}\nContent: ${content}`,
    };

    await Promise.all(
      studentEmails.map(async (email) => {
        try {
          const personalizedMailOptions = {
            ...mailOptions,
            to: email,
          };

          await transporter.sendMail(personalizedMailOptions);
          console.log(`Email has been sent to ${email}`);
        } catch (error) {
          console.error(`${error}`);
        }
      })
    );
    await announcement.save();

    res.status(201).json({ message: "Announcement created successfully." });
  } catch (error) {
    res.status(500).json({
      message: `There is an error: Internal server error. Please try again later.`,
    });
  }
});

const updateClassAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, typeOfAnnouncement } = req.body;

    const { teacherName, teacherEmail } = req.user;

    const updatedAnnouncement = await Announcement({
      title,
      content,
      typeOfAnnouncement,
    });

    const studentEmails = await Student.find({}).distinct("emailAddress");

    const mailOptions = {
      from: "mrmnhs.simsannouncement@gmail.com",
      subject: `School Announcement ${
        typeOfAnnouncement || "Important Announcement"
      }`,
      text: `Title ${title}\nContent: ${content}\n\nAnnouncement by: ${teacherName} (${teacherEmail})`,
    };
    for (const email of studentEmails) {
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
      } catch (error) {
        console.error(error);
      }
    }

    await updatedAnnouncement.save();

    res.status(200).json({ message: "Class Announcement has been updated." });
  } catch (error) {
    res.status(500).json({ message: "There is an error", error });
  }
});

const deleteClassAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    const deletedAnnouncement = await Announcement(title);

    if (!deletedAnnouncement) {
      res
        .status(404)
        .json({ message: "There is no announcement with that title" });

      res.status(202).json({ message: "" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error. Please try again later.` });
  }
});

const assignStudentToClass = asyncHandler(async (req, res) => {
  try {
    const { studentName, sectionName } = req.body;
    const [firstName, lastName, emailAddress] = studentName.split(" ");

    console.log("Attempting to assign student:", {
      firstName,
      lastName,
      emailAddress,
      sectionName,
    });

    const existingClassroom = await Classroom.findOne({ sectionName });

    if (!existingClassroom) {
      res.status(404).json({ message: "Class not found." });
    }

    const existingStudent = existingClassroom.students.find(
      (student) =>
        student.firstName === firstName &&
        student.lastName === lastName &&
        student.emailAddress === emailAddress
    );

    if (existingStudent) {
      res
        .status(400)
        .json({ message: "Student is already assigned to this class." });
    }

    const studentRecord = await Student.findOne({
      firstName,
      lastName,
      emailAddress,
    });

    if (!studentRecord) {
      res
        .status(404)
        .json({ message: "Student not found in enrolled records." });
    }

    existingClassroom.students.push({ firstName, lastName, emailAddress });

    await existingClassroom.save();

    res
      .status(200)
      .json({ message: "Student has been assigned to this class" });
  } catch (error) {
    console.error("Error in assignStudentToClass:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const updateAssignedStudentToClass = asyncHandler(async (req, res) => {
  try {
    const { studentName, sectionName } = req.body;
    const [firstName, lastName, emailAddress] =
      studentName.split(" ") || studentName.split("");

    console.log(`Attempting to update this student ${firstName} ${lastName}`);

    const existingClassroom = await Classroom.find({ sectionName });

    if (!existingClassroom) {
      res.status(404).json({
        message: "Classroom not found. Please check the section name properly.",
      });
    }

    const existingStudent = existingClassroom.students.find(
      (student) =>
        student.firstName === firstName &&
        student.lastName === lastName &&
        student.emailAddress === emailAddress
    );

    if (!existingStudent) {
      res.status(404).json({
        message: "Student not found. Please check the credentials properly.",
      });
    }

    const studentRecord = await Student.findOne({
      firstName,
      lastName,
      emailAddress,
    });

    if (!studentRecord) {
      res
        .status(404)
        .json({ message: "Student not found in enrolled records." });
    }

    const updatedStudent = await Classroom.findOneAndUpdate(
      {
        firstName,
        lastName,
        emailAddress,
      },
      { new: true }
    );

    const updatedClassroom = await Classroom.findOneAndUpdate(
      {
        sectionName,
        "students.firstName": firstName,
        "students.lastName": lastName,
        "students.emailAddress": emailAddress,
      },
      { $set: { "students.$": updatedStudent } },
      { new: true }
    );

    res.status(200).json({
      message: "Student on this class has been updated successfully.",
      updatedStudent,
      updatedClassroom,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

const removeStudentToClass = asyncHandler(async (req, res) => {
  try {
    const { studentName, sectionName } = req.body;
    const [firstName, lastName] =
      studentName.split(" ") || studentName.split("");

    const existingClassroom = await Classroom.findOne({ sectionName });

    if (!existingClassroom) {
      res.status(404).json({ message: "Class not found." });
    }

    const studentIndex = existingClassroom.students.findIndex(
      (student) =>
        student.firstName === firstName && student.lastName === lastName
    );

    if (studentIndex === -1) {
      res.status(404).json({ message: "Student not found in this class." });
    }

    await existingClassroom.splice(studentIndex, 1);

    res.status(200).json({ message: "Student has been removed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error. Please try again later.` });
  }
});

const getAssignedClasses = asyncHandler(async (req, res) => {
  try {
    const {
      adviser,
      // subjectTeachers
    } = req.query;

    const assignedClasses = await Classroom.find({
      $or: [
        { adviser: adviser },
        // { subjectTeachers: subjectTeachers },
        { "subjectTeachers.emailAddress": adviser }, // Assuming emailAddress is unique
      ],
    });

    if (!assignedClasses || assignedClasses.length === 0) {
      return res
        .status(404)
        .json({ message: "Teacher not found or not assigned to any classes." });
    }

    return res.status(200).json({
      message: "Assigned Classes retrieved successfully",
      data: assignedClasses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
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
    res.status(500).json({ message: error.message });
  }
});

const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const retrieveTeachers = await Teacher.find();

    // Map the retrieved data to create a new array with the desired fields
    const modifiedData = retrieveTeachers.map((teacher) => ({
      username: teacher.username,
      fullName: `${teacher.firstName} ${teacher.lastName}`,
    }));

    res.status(200).json({
      message: "The teachers data retrieved successfully",
      data: modifiedData,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

const updateStudentsInClass = asyncHandler(async (req, res) => {
  try {
    const { classId, studentEmails } = req.body;

    // Validate that required fields are provided
    if (!classId || !Array.isArray(studentEmails)) {
      return res.status(400).json({ message: "Invalid request payload." });
    }

    // Fetch the class
    const classroom = await Classroom.findById(classId);

    if (!classroom) {
      return res.status(404).json({ message: "Class not found." });
    }

    // Fetch the students by their emails
    const students = await Student.find({
      emailAddress: { $in: studentEmails },
    });

    if (students.length !== studentEmails.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found." });
    }

    // Update the students in the class
    classroom.students = students.map((student) => ({
      firstName: student.firstName,
      lastName: student.lastName,
      emailAddress: student.emailAddress,
    }));

    // Save the updated class
    const updatedClassroom = await classroom.save();

    res.status(200).json({
      message: "Students in class updated successfully.",
      updatedClassroom,
    });
  } catch (error) {
    console.error("Error updating students in class:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      error,
    });
  }
});

module.exports = {
  teacherLogin,
  getTeacherSchedule,
  getTeacherProfile,
  updateTeacherProfile,
  postClassAnnouncement,
  updateClassAnnouncement,
  deleteClassAnnouncement,
  assignStudentToClass,
  updateAssignedStudentToClass,
  removeStudentToClass,
  getAssignedClasses,
  getEnrolledStudents,
  getSpecificClass,
  getAllTeachers,
  updateStudentsInClass,
};
