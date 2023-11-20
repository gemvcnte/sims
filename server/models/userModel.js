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
    lrn: {
      type: String,
      required: true,
    },
    schoolYear: {
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
      default: "none",
    },
    guardianContactNumber: {
      type: String,
      default: "none",
    },
    guardianRelationship: {
      type: String,
      default: "none",
    },
    lrn: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      default: "null",
    },
    province: {
      type: String,
      default: "null",
    },
    city: {
      type: String,
      default: "null",
    },
    zipCode: {
      type: Number,
      default: null,
    },
    barangay: {
      type: String,
      default: "null",
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
  },
  { timestamps: true }
);

// Teacher Schema
const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: "",
      uppercase: true,
    },
    middleName: {
      type: String,
      required: true,
      default: "",
      uppercase: true,
    },
    lastName: {
      type: String,
      required: true,
      default: "",
      uppercase: true,
    },
    currentAddress: {
      type: String,
      required: true,
      default: "",
      uppercase: true,
    },
    birthDate: {
      type: String,
      required: true,
      default: "",
      uppercase: true,
    },
    gender: {
      type: String,
      required: true,
      default: "",
      uppercase: true,
    },
    username: {
      type: String,
      required: true,
      default: "",
    },
    emailAddress: {
      type: String,
      required: true,
      validate(value) {
        if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
          throw new Error("Email is not valid.");
        }
      },
      default: "",
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "teacher",
      enum: ["student", "teacher", "admin"],
    },
  },
  { timestamps: true }
);

// application schema
const studentApplicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      uppercase: true,
    },
    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },
    middleName: {
      type: String,
      required: true,
      uppercase: true,
    },
    extensionName: {
      type: String,
      required: true,
      uppercase: true,
    },
    birthDate: {
      type: String,
      required: true,
      uppercase: true,
    },
    gender: {
      type: String,
      required: true,
      uppercase: true,
    },
    currentAddress: {
      type: String,
      required: true,
      uppercase: true,
    },
    emailAddress: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
          throw new Error("Email is not valid.");
        }
      },
    },
    fatherName: {
      type: String,
      required: true,
      uppercase: true,
    },
    fatherContactNumber: {
      type: String,
      required: true,
      uppercase: true,
    },
    motherName: {
      type: String,
      required: true,
      uppercase: true,
    },
    motherContactNumber: {
      type: String,
      required: true,
      uppercase: true,
    },
    guardianName: {
      type: String,
      default: "none",
      uppercase: true,
    },
    guardianContactNumber: {
      type: String,
      default: "none",
    },
    guardianAddress: {
      type: String,
      default: "none",
      uppercase: true,
    },
    lrn: {
      type: String,
      required: true,
    },
    schoolYear: {
      type: Number,
      required: true,
    },
    semester: {
      type: String,
      required: true,
      uppercase: true,
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
    registrationDate: String,
    status: {
      type: String,
      default: "pending",
      uppercase: true,
    },
    //if want to hash the password only remove the password attribute
    // password: {
    //     type: String,
    //     required: true,
    // }
  },
  { timestamps: true }
);

// Admin
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
      enum: ["student", "teacher", "admin"],
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("studentEnrolled", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const StudentApplication = mongoose.model("StudentApplication", studentApplicationSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Student, Teacher, StudentApplication, Admin };

// const userSchema = mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     middleName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: true,
//     },
//     age: {
//         type: String,
//         required: true,
//     },
//     gender: {
//         type: String,
//         required: true,
//     },
//     userImage: {
//         type: String,
//         required: true,
//         default: "",
//     },
//     firstName: {
//         type: String,
//         required: true,
//     },
// })

// const User = ('User', userSchema)
