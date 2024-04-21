const { StudentApplication } = require("../models/StudentApplicationModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { Student } = require("../models/StudentModel");

const applyStudent = asyncHandler(async (req, res) => {
  try {
    const registrationData = req.body;

    console.log(`registrationData`, registrationData);

    if (registrationData.hasAccount) {
      // Find the student by LRN (Learning Reference Number)
      const existingStudent = await Student.findOne({
        lrn: registrationData.lrn,
      });

      if (!existingStudent) {
        return res.status(404).json({
          error:
            "The LRN provided does not match any student records in our system",
        });
      }

      // Check for LRN conflict with different last name
      const existingEnrolledStudentWithLastnameConflict = await Student.findOne(
        {
          lrn: registrationData.lrn,
          lastName: { $ne: registrationData.lastName },
        }
      );

      // Check for LRN conflict with different first name
      const existingEnrolledStudentWithFirstnameConflict =
        await Student.findOne({
          lrn: registrationData.lrn,
          firstName: { $ne: registrationData.firstName },
        });

      if (
        existingEnrolledStudentWithLastnameConflict ||
        existingEnrolledStudentWithFirstnameConflict
      ) {
        return res.status(400).json({
          message:
            "It looks like the LRN provided is already associated with a student who has a different last name or first name. Please review your details and try again.",
        });
      }
    } else {
      // Find the student by LRN (Learning Reference Number)
      const existingStudent = await Student.findOne({
        lrn: registrationData.lrn,
      });

      if (existingStudent) {
        return res.status(404).json({
          error: "A student with this LRN is already registered in our system",
        });
      }
    }

    // Check if there is an existing pending application for the LRN with the same school year and semester
    const existingPendingApplication = await StudentApplication.findOne({
      lrn: registrationData.lrn,
      "schoolYear.year": registrationData.schoolYear.year,
      "schoolYear.semester": registrationData.schoolYear.semester,
      status: "pending",
    });

    if (existingPendingApplication) {
      return res.status(400).json({
        message:
          "This LRN already has a pending application for this semester.",
      });
    }

    // Create new student application
    const student = new StudentApplication(registrationData);
    const savedStudent = await student.save();

    return res.json({
      message: "Personal information saved",
      student: savedStudent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to save personal information",
      message: err.message,
    });
  }
});

module.exports = { applyStudent };
