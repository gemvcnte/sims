const asyncHandler = require("express-async-handler");
const { transporter } = require("../mailer");
const bcryptjs = require("bcryptjs");

const { Admin } = require("../models/AdminModel");
const { Teacher } = require("../models/TeacherModel");
const { Student } = require("../models/StudentModel");

const ResetPasswordCode = require("../models/ResetPasswordCodeModel");

const resetUserPassword = asyncHandler(async (req, res) => {
  try {
    let { username } = req.body;
    username = username.toLowerCase();

    let user;

    user = await Student.findOne({ lrn: username });

    if (!user) {
      user = await Teacher.findOne({ username });
    }

    if (!user) {
      user = await Admin.findOne({ username });
    }

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }

    const userEmail = user.emailAddress;

    if (!userEmail) {
      return res
        .status(404)
        .json({ message: "Email not found. Please try again." });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const resetPasswordCode = new ResetPasswordCode({
      username,
      email: userEmail,
      code: resetCode,
    });

    const mailOptions = {
      from: {
        name: "SIMSv1 Support",
        address: "noreply@simsv1.com",
      },
      to: userEmail,
      subject: "Password Reset Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <p>Hello ${user.firstName},</p>
          <p>We've received a request to reset your password for your SIMSv1 account.</p>
          <p style="margin-bottom: 20px;">Please use the following code to reset your password:</p>
          <div style="background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin-bottom: 20px;">
            <h3 style="margin: 0;">Reset Code:</h3>
            <p style="font-size: 20px; font-weight: bold; margin: 10px 0;">${resetCode}</p>
          </div>
          <p style="margin-bottom: 20px;">If you didn't request this, you can safely ignore this email.</p>
          <p>Thank you,</p>
          <p>SIMSv1 Support Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    await resetPasswordCode.save();

    res
      .status(200)
      .json({ message: "Reset password code has been sent to your email." });
  } catch (error) {
    console.error("Error generating reset password code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const resetStudentPasswordFinal = asyncHandler(async (req, res) => {
  const { code } = req.body;

  try {
    const resetCodeInfo = await ResetPasswordCode.findOne({ code });

    if (!resetCodeInfo) {
      return res.status(404).json({ message: "Invalid reset code." });
    }

    if (resetCodeInfo.status !== "active") {
      return res
        .status(400)
        .json({ message: "Reset password code is expired." });
    }

    const student = await Student.findOne({ lrn: resetCodeInfo.lrn });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    student.password = bcryptjs.hashSync(student.birthDate, 10);
    await student.save();

    resetCodeInfo.status = "expired";
    await resetCodeInfo.save();

    await student.save();

    const mailOptions = {
      from: {
        name: "SIMSv1 PASSWORD RESET",
        address: "noreply@simsv1.com",
      },
      to: resetCodeInfo.email,
      subject: "Password Reset Code",
      text: `Your password has been reset successfully.`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Your password has been reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { resetUserPassword, resetStudentPasswordFinal };
