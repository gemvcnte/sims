const mongoose = require("mongoose");

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    extensionName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    currentAddress: {
      type: String,
      required: false,
    },
    lrn: {
      type: String,
      required: true,
    },
    schoolYear: {
      type: String,
      required: false,
    },
    track: {
      type: String,
      required: false,
    },
    strand: {
      type: String,
      required: false,
    },
    semester: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: true,
      validate(value) {
        if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
          throw new Error("Email is not valid.");
        }
      },
    },
    fatherName: {
      type: String,
      required: true,
    },
    fatherContactNumber: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherContactNumber: {
      type: String,
      required: true,
    },
    guardianName: {
      type: String,
      default: "",
    },
    guardianContactNumber: {
      type: String,
      default: "",
    },
    guardianRelationship: {
      type: String,
      default: "",
    },
    lrn: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      default: null,
    },
    province: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    zipCode: {
      type: Number,
      default: null,
    },
    barangay: {
      type: String,
      default: null,
    },
    fourPs: {
      type: Boolean,
      default: null,
    },

    role: {
      type: String,
      default: "student",
      enum: ["student", "teacher", "admin"],
    },

    password: {
      type: String,
    },
    userImage: {
      type: String,
      // need nalang lagyan ng image
      default: "",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("studentEnrolled", studentSchema);

module.exports = { Student };