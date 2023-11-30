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
      // designation: {
      //   type: String,
      //   required: true,
      // },
      // numOfYearsTeaching: {
      //   type: Number,
      //   required: true,
      // },
      // specialization: {
      //   type: String,
      //   required: true,
      // },
      // highestEducationalAttainment: {
      //   type: String,
      //   required: true,
      // },
      // tinNumber: {
      //   type: Number,
      //   required: true,
      // },
      // gsisNumber: {
      //   type: Number,
      //   required: true,
      // },
      // plantillaNumber: {
      //   type: Number,
      //   required: true,
      // },

},
    { timestamps: true }
  );

const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = {Teacher}