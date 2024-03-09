const { StudentApplication } = require("../models/StudentApplicationModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { Student } = require("../models/StudentModel");

const applyStudent = asyncHandler(async (req, res) => {
  try {
    const registrationData = req.body;

    // Find the student by LRN (Learning Reference Number)
    const existingStudent = await Student.findOne({
      lrn: registrationData.lrn,
    });

    if (!existingStudent) {
      return res
        .status(404)
        .json({ error: "Student with this LRN was not found." });
    }

    // Check for LRN conflict with different last name
    const existingEnrolledStudentWithLastnameConflict = await Student.findOne({
      lrn: registrationData.lrn,
      lastName: { $ne: registrationData.lastName },
    });

    if (existingEnrolledStudentWithLastnameConflict) {
      return res.status(400).json({
        message:
          "LRN was already used by a student with a different last name.",
      });
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
