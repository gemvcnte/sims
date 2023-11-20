const mongoose = require('mongoose')


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

const Admin = mongoose.model("Admin", adminSchema);

module.exports = {Admin}