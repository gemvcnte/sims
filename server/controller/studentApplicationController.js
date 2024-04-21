const { StudentApplication } = require("../models/StudentApplicationModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { Student } = require("../models/StudentModel");
const ArchivedStudent = require("../models/ArchivedStudentModel");

const applyStudent = asyncHandler(async (req, res) => {
  try {
    const registrationData = req.body;

    if (registrationData.hasAccount) {
      const studentIsArchived = await ArchivedStudent.findOne({
        lrn: registrationData.lrn,
      });

      if (studentIsArchived) {
        return res.status(404).json({
          error:
            "Your account is currently archived. Please reach out to the administrator for assistance.",
        });
      }

      const existingStudent = await Student.findOne({
        lrn: registrationData.lrn,
      });

      if (!existingStudent) {
        return res.status(404).json({
          error:
            "The LRN provided does not match any student records in our system",
        });
      }

      if (!existingStudent) {
        return res.status(404).json({
          error:
            "The LRN provided does not match any student records in our system",
        });
      }

      const existingEnrolledStudentWithLastNameConflict = await Student.findOne(
        {
          lrn: registrationData.lrn,
          lastName: { $ne: registrationData.lastName },
        }
      );

      const existingEnrolledStudentWithFirstNameConflict =
        await Student.findOne({
          lrn: registrationData.lrn,
          firstName: { $ne: registrationData.firstName },
        });

      if (existingEnrolledStudentWithLastNameConflict) {
        return res.status(400).json({
          message:
            "The LRN provided is already associated with a student who has a different last name. Please review your details and try again.",
        });
      }

      if (existingEnrolledStudentWithFirstNameConflict) {
        return res.status(400).json({
          message:
            "The LRN provided is already associated with a student who has a different first name. Please review your details and try again.",
        });
      }
    }

    const existingPendingApplication = await StudentApplication.findOne({
      lrn: registrationData.lrn,
      "schoolYear.year": registrationData.schoolYear.year,
      "schoolYear.semester": registrationData.schoolYear.semester,
      status: "pending",
    });

    if (existingPendingApplication) {
      return res.status(400).json({
        message:
          "There's already a pending application for this LRN in the current semester.",
      });
    }

    // Create new student application
    const student = new StudentApplication(registrationData);
    const savedStudent = await student.save();

    return res.json({
      error:
        "Oops! Something went wrong while processing your enrollment. Please try again later.",
      student: savedStudent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        "Oops! Something went wrong while processing your enrollment. Please try again later.",
      message: err.message,
    });
  }
});

module.exports = { applyStudent };
