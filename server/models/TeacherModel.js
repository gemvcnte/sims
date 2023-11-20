const mongoose = require('mongoose')


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
      userImage: {
        type: String,
        // need nalang lagyan ng image
        default: ''
      },
  
},
    { timestamps: true }
  );

const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = {Teacher}