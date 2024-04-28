const { Teacher } = require("../models/TeacherModel");
const { Student } = require("../models/StudentModel");
const { Classroom } = require("../models/ClassroomModel");
const { Announcement } = require("../models/Announcement");
const { Schedule } = require("../models/ScheduleModel");
const asyncHandler = require("express-async-handler");
const generateAuthToken = require("../configs/auth");
const bcryptjs = require("bcryptjs");
const { transporter } = require("../mailer");
const { Admin } = require("../models/AdminModel");
const { GlobalSettings } = require('../models/GlobalSettingsModel');


//
const teacherLogin = asyncHandler(async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase(); 

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
      "firstName lastName lrn"
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
      subject: `School Announcement ${typeOfAnnouncement || "Important Announcement"
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
      res.status(404).json({ message: "There is no announcement with that title" });

      // res.status(202).json({ message: "Class announcement has been deleted." });
      res.status(202).json({ message: "" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error. Please try again later.` });
  }
});

// const assignStudentToClass = asyncHandler(async (req, res) => {
//   try {
//     const { studentName, sectionName } = req.body;
//     const [firstName, lastName, emailAddress] = studentName.split(" ");

//     console.log("Attempting to assign student:", {
//       firstName,
//       lastName,
//       emailAddress,
//       sectionName,
//     });

//     const existingClassroom = await Classroom.findOne({ sectionName });

//     if (!existingClassroom) {
//       res.status(404).json({ message: "Class not found." });
//     }

//     const existingStudent = existingClassroom.students.find(
//       (student) =>
//         student.firstName === firstName &&
//         student.lastName === lastName &&
//         student.emailAddress === emailAddress
//     );

//     if (existingStudent) {
//       res
//         .status(400)
//         .json({ message: "Student is already assigned to this class." });
//     }

//     const studentRecord = await Student.findOne({
//       firstName,
//       lastName,
//       emailAddress,
//     });

//     if (!studentRecord) {
//       res
//         .status(404)
//         .json({ message: "Student not found in enrolled records." });
//     }

//     existingClassroom.students.push({ firstName, lastName, emailAddress });

//     await existingClassroom.save();

//     res
//       .status(200)
//       .json({ message: "Student has been assigned to this class" });
//   } catch (error) {
//     console.error("Error in assignStudentToClass:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error. Please try again later." });
//   }
// });

// const updateAssignedStudentToClass = asyncHandler(async (req, res) => {
//   try {
//     const { studentName, sectionName } = req.body;
//     const [firstName, lastName, emailAddress] =
//       studentName.split(" ") || studentName.split("");

//     console.log(`Attempting to update this student ${firstName} ${lastName}`);

//     const existingClassroom = await Classroom.find({ sectionName });

//     if (!existingClassroom) {
//       res.status(404).json({
//         message: "Classroom not found. Please check the section name properly.",
//       });
//     }

//     const existingStudent = existingClassroom.students.find(
//       (student) =>
//         student.firstName === firstName &&
//         student.lastName === lastName &&
//         student.emailAddress === emailAddress
//     );

//     if (!existingStudent) {
//       res.status(404).json({
//         message: "Student not found. Please check the credentials properly.",
//       });
//     }

//     const studentRecord = await Student.findOne({
//       firstName,
//       lastName,
//       emailAddress,
//     });

//     if (!studentRecord) {
//       res
//         .status(404)
//         .json({ message: "Student not found in enrolled records." });
//     }

//     const updatedStudent = await Classroom.findOneAndUpdate(
//       {
//         firstName,
//         lastName,
//         emailAddress,
//       },
//       { new: true }
//     );

//     const updatedClassroom = await Classroom.findOneAndUpdate(
//       {
//         sectionName,
//         "students.firstName": firstName,
//         "students.lastName": lastName,
//         "students.emailAddress": emailAddress,
//       },
//       { $set: { "students.$": updatedStudent } },
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Student on this class has been updated successfully.",
//       updatedStudent,
//       updatedClassroom,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal server error. Please try again later." });
//   }
// });

// const removeStudentToClass = asyncHandler(async (req, res) => {
//   try {
//     const { studentName, sectionName } = req.body;
//     const [firstName, lastName] =
//       studentName.split(" ") || studentName.split("");

//     const existingClassroom = await Classroom.findOne({ sectionName });

//     if (!existingClassroom) {
//       res.status(404).json({ message: "Class not found." });
//     }

//     const studentIndex = existingClassroom.students.findIndex(
//       (student) =>
//         student.firstName === firstName && student.lastName === lastName
//     );

//     if (studentIndex === -1) {
//       res.status(404).json({ message: "Student not found in this class." });
//     }

//     await existingClassroom.splice(studentIndex, 1);

//     res.status(200).json({ message: "Student has been removed successfully." });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Internal server error. Please try again later.` });
//   }
// });

const getAssignedClasses = asyncHandler(async (req, res) => {
  try {
    const { username } = req.user;

    const assignedClasses = await Classroom.find({
      $or: [
        { adviser: username },
        { subjects: { $elemMatch: { "subjectTeacher": username } } },
      ],
    });

    if (!assignedClasses || assignedClasses.length === 0) {
      return res.status(404).json({
        message: "Teacher not found or not assigned to any classes.",
      });
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



const getTeacherSchedule = asyncHandler(async (req, res) => {
  try {
    const { username } = req.user;

    // Get current school year and semester from global settings
    const globalSettings = await GlobalSettings.findOne();
    const { schoolYear, semester } = globalSettings;

    // Find classes where the teacher is either adviser or subject teacher
    const assignedClasses = await Classroom.find({
      $and: [
        {
          $or: [
            { adviser: username },
            { subjects: { $elemMatch: { subjectTeacher: username } } },
          ],
        },
        { schoolYear: schoolYear },
        { semester: semester }
      ],
    });

    // if (!assignedClasses || assignedClasses.length === 0) {
    //   return res.status(404).json({
    //     message: "Teacher not found or not assigned to any classes in the current school year and semester.",
    //   });
    // }

    // Compile teacher's schedule
    let teacherSchedule = {};

    assignedClasses.forEach((classroom) => {
      classroom.subjects.forEach((subject) => {
        if (subject.subjectTeacher === username) {
          // If the teacher is the subject teacher
          subject.schedules.forEach((schedule) => {
            if (!teacherSchedule[schedule.day]) {
              teacherSchedule[schedule.day] = [];
            }
            teacherSchedule[schedule.day].push({
              class: classroom.sectionName,
              subject: subject.subjectName,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
            });
          });
        }
      });
    });

    return res.status(200).json({
      message: "Teacher schedule retrieved successfully",
      data: teacherSchedule,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});





const getTeacherScheduleByUsername = asyncHandler(async (req, res) => {
  try {
    const { username } = req.params;

    // Get current school year and semester from global settings
    const globalSettings = await GlobalSettings.findOne();
    const { schoolYear, semester } = globalSettings;

    // Find classes where the teacher is either adviser or subject teacher
    const assignedClasses = await Classroom.find({
      $and: [
        {
          $or: [
            { adviser: username },
            { subjects: { $elemMatch: { subjectTeacher: username } } },
          ],
        },
        { schoolYear: schoolYear },
        { semester: semester }
      ],
    });

    // if (!assignedClasses || assignedClasses.length === 0) {
    //   return res.status(404).json({
    //     message: "Teacher not found or not assigned to any classes in the current school year and semester.",
    //   });
    // }

    // Compile teacher's schedule
    let teacherSchedule = [];

    assignedClasses.forEach((classroom) => {
      classroom.subjects.forEach((subject) => {
        if (subject.subjectTeacher === username) {
          // If the teacher is the subject teacher
          subject.schedules.forEach((schedule) => {
            teacherSchedule.push({
              day: schedule.day,
              class: classroom.sectionName,
              subject: subject.subjectName,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              subjectId: subject._id,
            });
          });
        }
      });
    });

    return res.status(200).json({
      message: "Teacher schedule retrieved successfully",
      data: teacherSchedule,
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

    // Sort students by lastname ascending
    findClass.students.sort((a, b) => a.lastName.localeCompare(b.lastName));

    return res.status(200).json({
      message: "Class found",
      data: findClass,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const getSpecificStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const findStudent = await Student.findOne({ _id: id });

    if (!findStudent) {
      res.status(404).json({ message: 'Student data not found.' })
    }

    res.status(200).json({
      message: 'Student data found.',
      data: findStudent
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
})


const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const retrieveTeachers = await Teacher.find();
    const retrieveAdmins = await Admin.find();

    const allTeachers = [...retrieveTeachers, ...retrieveAdmins];

    // Map the retrieved data to create a new array with the desired fields
    const modifiedData = allTeachers.map((teacher) => ({
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
    const { classId, studentLrns } = req.body;

    // Validate that required fields are provided
    if (!classId || !Array.isArray(studentLrns)) {
      return res.status(400).json({ message: "Invalid request payload." });
    }

    // Fetch the class
    const classroom = await Classroom.findById(classId);

    if (!classroom) {
      return res.status(404).json({ message: "Class not found." });
    }

    // Check if the user making the request is the adviser of the class
    if (classroom.adviser !== req.user.username) {
      return res.status(403).json({
        message: "Unauthorized: You are not the adviser of this class.",
      });
    }

    // Fetch the students by their LRNs
    const students = await Student.find({
      lrn: { $in: studentLrns },
    });

    if (students.length !== studentLrns.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found." });
    }

    // Extract the original LRNs before updating classroom
    const originalLRNs = classroom.students.map((student) => student.lrn);
    console.log(`Original lrns: `, originalLRNs);

    // Update the students in the class
    const updatedStudents = students.map((student) => ({
      firstName: student.firstName,
      lastName: student.lastName,
      lrn: student.lrn,
    }));

    // Extract the existing grades
    const existingGrades = {};
    classroom.subjects.forEach((subject) => {
      subject.grades.forEach((grade) => {
        existingGrades[grade.lrn] = existingGrades[grade.lrn] || {};
        existingGrades[grade.lrn][subject.subjectName] = {
          p1Grade: grade.p1Grade,
          p2Grade: grade.p2Grade,
        };
      });
    });

    // Update the students in the class
    classroom.students = students.map((student) => ({
      firstName: student.firstName,
      lastName: student.lastName,
      lrn: student.lrn,
    }));

    // Update the LRNs in the grades array
    classroom.subjects.forEach((subject) => {
      subject.grades = studentLrns.map((lrn) => ({
        lrn,
        p1Grade: "", // Set initial values for p1Grade and p2Grade
        p2Grade: "",
      }));
    });

    // Find removed LRNs
    const removedLRNs = originalLRNs.filter(
      (lrn) => !studentLrns.includes(lrn)
    );
    console.log("Removed LRNs:", removedLRNs);

    // Remove sectionId and sectionName for removed LRNs

    await Promise.all(
      students.map(async (student) => {
        console.log("Removed LRNs:", removedLRNs);
        console.log("Student LRN:", student.lrn);
        student.schoolYear.forEach((year) => {
          if (
            String(year.year) === String(classroom.schoolYear) &&
            year.semester === classroom.semester
          ) {
            if (removedLRNs.includes(student.lrn)) {
              // If the LRN is in the removed LRNs array, set sectionId and sectionName to empty string
              // year.sectionId = "";
              // year.sectionName = "";
              console.log("included");
            } else {
              // If not in the removed LRNs array, set sectionId and sectionName accordingly
              year.sectionId = classroom._id.toString(); // Convert ObjectId to string
              year.sectionName = classroom.sectionName;
            }
          }
        });

        await student.save(); // Save the changes to the student document
      })
    );

    const removedStudents = await Promise.all(
      removedLRNs.map(async (lrn) => {
        const removedStudent = await Student.findOne({ lrn });
        if (removedStudent) {
          return removedStudent;
        }
      })
    );

    await Promise.all(
      removedStudents.map(async (student) => {
        student.schoolYear.forEach((year) => {
          if (
            String(year.year) === String(classroom.schoolYear) &&
            year.semester === classroom.semester
          ) {
            year.sectionId = "";
            year.sectionName = "";
          }
        });
        await student.save();
      })
    );

    // Save the updated class
    const updatedClassroom = await classroom.save();

    // Restore the existing grades for the updated students
    updatedClassroom.subjects.forEach((subject) => {
      subject.grades.forEach((grade) => {
        if (
          existingGrades[grade.lrn] &&
          existingGrades[grade.lrn][subject.subjectName]
        ) {
          grade.p1Grade =
            existingGrades[grade.lrn][subject.subjectName].p1Grade;
          grade.p2Grade =
            existingGrades[grade.lrn][subject.subjectName].p2Grade;
        }
      });
    });

    // Save the class with the restored grades
    const finalUpdatedClassroom = await updatedClassroom.save();

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





const addSubjectToClass = asyncHandler(async (req, res) => {
  const { classId, subjectName, subjectTeacher, schedules } = req.body;

  const classroom = await Classroom.findById(classId);

  if (!classroom) {
    return res.status(404).json({ message: "Oops! Couldn't find that class." });
  }

  if (classroom.adviser !== req.user.username) {
    return res.status(403).json({
      message: "Uh-oh! You're not the adviser of this class. Unauthorized access.",
    });
  }

  if (classroom.subjects.length >= 15) {
    return res.status(400).json({
      message: "Whoops! You've already reached the maximum of 15 subjects for this class.",
    });
  }

  const existingSubject = classroom.subjects.find(subject => subject.subjectName === subjectName);
  if (existingSubject) {
    return res.status(400).json({
      message: "This subject already exists in this section.",
    });
  }

  const studentLrns = classroom.students.map(student => student.lrn);

  const newSubject = {
    subjectName,
    subjectTeacher,
    schedules,
    grades: studentLrns.map(lrn => ({
      lrn,
      p1Grade: "",
      p2Grade: "",
    })),
  };

  classroom.subjects.push(newSubject);

  await classroom.save();

  res.status(201).json({ message: "Success! Subject has been added to the class." });
});




const updateSubjectClass = asyncHandler(async (req, res) => {
  const { subjectId, subjectName, subjectTeacher, schedules } = req.body;

  try {
    const classroom = await Classroom.findOne({
      'subjects._id': subjectId,
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Subject not found in any class.' });
    }

    if (classroom.adviser !== req.user.username) {
      return res.status(403).json({
        message: "Unauthorized: You are not the adviser of this class.",
      });
    }

    const subjectIndex = classroom.subjects.findIndex(
      (subject) => subject._id.toString() === subjectId
    );

    if (subjectIndex === -1) {
      return res.status(404).json({ message: 'Subject not found in class.' });
    }

    // Update the subject fields
    classroom.subjects[subjectIndex].subjectName = subjectName;
    classroom.subjects[subjectIndex].subjectTeacher = subjectTeacher;
    classroom.subjects[subjectIndex].schedules = schedules;

    await classroom.save();

    res.json({ message: 'Subject updated successfully', updatedSubject: classroom.subjects[subjectIndex] });
  } catch (error) {
    console.error('Error updating subject:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const deleteSubjectFromClass = asyncHandler(async (req, res) => {
  try {
    const { subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ message: 'subjectId is required in the request body' });
    }

    const classroom = await Classroom.findOne({ 'subjects._id': subjectId });

    if (!classroom) {
      return res.status(404).json({ message: 'Subject not found in any class.' });
    }

    if (classroom.adviser !== req.user.username) {
      return res.status(403).json({
        message: "Unauthorized: You are not the adviser of this class.",
      });
    }

    classroom.subjects = classroom.subjects.filter(subject => subject._id.toString() !== subjectId);

    await classroom.save();

    res.status(200).json({ message: 'Subject removed from class successfully.' });
  } catch (error) {
    console.error('Error deleting subject from class:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



const createTeacherAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, classId } = req.body;

    const createdBy = req.user && req.user.username ? req.user.username : 'teacher';

    const isValidClassId = await Classroom.findById(classId);

    if (!isValidClassId) {
      return res.status(400).json({ message: 'Invalid classId provided.' });
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
      message: 'Announcement created successfully.',
      data: announcement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



const getAnnouncements = asyncHandler(async (req, res) => {
  try {
    const { username } = req.user;

    const announcements = await Announcement.find({
      $or: [
        { isPublic: true }, 
        { createdBy: username }, 
      ],
    })  
    .sort({ createdAt: -1 }) 
    .populate('class', 'sectionName'); 

    res.status(200).json({
      message: 'Announcements retrieved successfully',
      data: announcements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


const updateGradesOnClass = asyncHandler(async (req, res) => {
  try {
    const { classId, subjectId, grades } = req.body;

    // Validate that required fields are provided
    if (!classId || !subjectId || !grades || typeof grades !== 'object') {
      return res.status(400).json({ message: "Invalid request payload." });
    }

    // Fetch the class
    const classroom = await Classroom.findById(classId);

    if (!classroom) {
      return res.status(404).json({ message: "Class not found." });
    }

    // Check if the user making the request is the subjectTeacher of the specified subjectId
    const subject = classroom.subjects.find(subject => subject._id.toString() === subjectId);
    if (!subject || subject.subjectTeacher !== req.user.username) {
      return res.status(403).json({
        message: "Unauthorized: You are not the subject teacher of this subject.",
      });
    }

    // Find the subject in the class
    const subjectIndex = classroom.subjects.findIndex(
      (subject) => subject._id.toString() === subjectId
    );

    if (subjectIndex === -1) {
      return res.status(404).json({ message: 'Subject not found in class.' });
    }

    // Update the grades for the subject
    classroom.subjects[subjectIndex].grades = [];

    // Convert the nested grades into a flat array
    for (const [lrn, grade] of Object.entries(grades)) {
      classroom.subjects[subjectIndex].grades.push({
        lrn,
        ...grade,
      });
    }

    // Save the updated class
    const updatedClassroom = await classroom.save();

    res.status(200).json({
      message: "Grades on class updated successfully.",
      updatedClassroom,
    });
  } catch (error) {
    console.error("Error updating grades on class:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      error,
    });
  }
});


const updateTeacherPassword = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { currentPassword, newPassword } = req.body;

    const teacher = await Teacher.findById(_id);

    if (!(await bcryptjs.compare(currentPassword, teacher.password))) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    teacher.password = hashedNewPassword;
    await teacher.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to change password." });
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
  // assignStudentToClass,
  // updateAssignedStudentToClass,
  // removeStudentToClass,
  getAssignedClasses,
  getEnrolledStudents,
  getSpecificClass,
  getSpecificStudent,
  getAllTeachers,
  updateStudentsInClass,
  addSubjectToClass,
  updateSubjectClass,
  deleteSubjectFromClass,
  createTeacherAnnouncement,
  getAnnouncements,
  updateGradesOnClass,
  updateTeacherPassword,
  getTeacherScheduleByUsername,
};
