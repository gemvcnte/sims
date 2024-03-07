const mongoose = require("mongoose");

const studentApplicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      uppercase: true,
    },
    middleName: {
      type: String,
      default: null,
      uppercase: true,
    },
    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },
    extensionName: {
      type: String,
      // required: true,
      uppercase: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
      uppercase: true,
    },
    currentAddress: {
      type: String,
      required: false,
      uppercase: true,
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
          enum: [11, 12], 
          required: true,
        },
        track: {
          type: String,
          required: true,
        },
        strand: {
          type: String,
          enum: ["humss", "abm", "stem", "ict", "he"],
          required: true,
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
      enum: ["Non-relative", "Relative"],
      default: "",
    },
    status: {
      type: String,
      default: "pending",
      uppercase: true,
    },
    userImage: {
      type: String,
      // need nalang lagyan ng image
      default: "",
    },

    //if want to hash the password only remove the password attribute
    // password: {
    //     type: String,
    //     required: true,
    // }
  },
  { timestamps: true }
);

const StudentApplication = mongoose.model(
  "StudentApplication",
  studentApplicationSchema
);

module.exports = { StudentApplication };
