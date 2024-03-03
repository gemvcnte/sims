const { StudentApplication } = require("../models/StudentApplicationModel");
const { GlobalSettings } = require("../models/GlobalSettingsModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

const applyStudent = asyncHandler(async (req, res) => {
  try {
    const registrationData = req.body;

    // Fetch global settings from the database
    const globalSettings = await GlobalSettings.findOne({});

    if (!globalSettings) {
      return res.status(500).json({ error: "Global settings not found" });
    }

    // Populate schoolYear and semester from global settings
    registrationData.schoolYear = globalSettings.schoolYear;
    registrationData.semester = globalSettings.semester;

    // Check if the LRN already exists
    const existingStudent = await StudentApplication.findOne({
      lrn: registrationData.lrn,
    });

    if (existingStudent) {
      // Update existing student
      if (existingStudent.lastName === registrationData.lastName) {
        const hashedPassword = await bcryptjs.hash(
          registrationData.birthDate,
          10
        );

        await StudentApplication.updateOne(
          { lrn: registrationData.lrn },
          {
            $set: {
              ...registrationData,
              password: hashedPassword,
            },
          }
        );

        return res.json({
          message: "Student Information updated successfully.",
        });
      } else {
        // Create new student application
        const hashedPassword = await bcryptjs.hash(
          registrationData.birthDate,
          10
        );

        registrationData.registrationDate = new Date();
        registrationData.password = hashedPassword;

        const student = new StudentApplication(registrationData);
        const savedStudent = await student.save();

        return res.json({
          message: "Personal information saved",
          student: savedStudent,
        });
      }
    } else {
      // Create new student application
      const hashedPassword = await bcryptjs.hash(
        registrationData.birthDate,
        10
      );

      registrationData.registrationDate = new Date();
      registrationData.password = hashedPassword;

      const student = new StudentApplication(registrationData);
      const savedStudent = await student.save();

      return res.json({
        message: "Personal information saved",
        student: savedStudent,
      });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Failed to save personal information" });
  }
});

module.exports = { applyStudent };
