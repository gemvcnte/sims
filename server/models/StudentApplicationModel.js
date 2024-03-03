const mongoose = require('mongoose')


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
        default: null,
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
        uppercase: true,
      },
      fatherContactNumber: {
        type: String,
        uppercase: true,
      },
      motherName: {
        type: String,
        uppercase: true,
      },
      motherContactNumber: {
        type: String,
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
        type: String,
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
      userImage: {
        type: String,
        // need nalang lagyan ng image
        default: ''
      },
  
      //if want to hash the password only remove the password attribute
      // password: {
      //     type: String,
      //     required: true,
      // }
    },
    { timestamps: true }
  );



const StudentApplication = mongoose.model("StudentApplication", studentApplicationSchema);


module.exports = {StudentApplication}