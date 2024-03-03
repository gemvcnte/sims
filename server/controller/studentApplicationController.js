const { StudentApplication } = require("../models/StudentApplicationModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

const applyStudent = asyncHandler(async (req, res) => {
  try {
    const registrationData = req.body;

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
    return res
      .status(500)
      .json({ error: "Failed to save personal information" });
  }
});

module.exports = { applyStudent };
