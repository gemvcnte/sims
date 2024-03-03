const mongoose = require("mongoose");

const studentApplicationSchema = new mongoose.Schema(
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
    schoolYear: {
      year: {
        type: String,
        required: true,
      },
      semester: [
        {
          type: {
            type: String,
            required: true,
          },
          sectionId: {
            type: mongoose.Types.ObjectId,
            ref: "Classroom",
          },
          sectionName: {
            type: String,
            required: true,
          },
          gradeLevel: {
            type: Number,
            required: true,
          },
          track: {
            type: String,
            required: false,
          },
          strand: {
            type: String,
            required: false,
          },
        },
      ],
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
    registrationDate: String,
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
