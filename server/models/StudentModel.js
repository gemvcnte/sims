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
      default: null,
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
    schoolYear: [
      {
        year: {
          type: String,
          required: true,
        },
        semester: {
          type: String,
          required: true,
        },
        gradeLevel: {
          type: Number,
          required: true,
        },
        track: {
          type: String,
          required: true,
          uppercase: true,
        },
        strand: {
          type: String,
          required: true,
          uppercase: true,
        },
        sectionId: {
          type: mongoose.Types.ObjectId,
          ref: "Classroom",
          required: false,
        },
        sectionName: {
          type: String,
          required: false,
        },
      },
    ],
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
    },
    fatherContactNumber: {
      type: String,
    },
    motherName: {
      type: String,
    },
    motherContactNumber: {
      type: String,
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

const Student = mongoose.model("StudentEnrolled", studentSchema);

module.exports = { Student };
