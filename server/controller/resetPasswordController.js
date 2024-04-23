const asyncHandler = require("express-async-handler");
const ResetPasswordCode = require("../models/ResetPasswordCodeModel");
const { Student } = require("../models/StudentModel");
const { transporter } = require("../mailer");
const bcryptjs = require("bcryptjs");

const resetPassword = asyncHandler(async (req, res) => {
  const { lrn } = req.body;

  try {
    const student = await Student.findOne({ lrn });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found. Please try again." });
    }

    const studentEmail = student.emailAddress;

    if (!studentEmail) {
      return res
        .status(404)
        .json({ message: "Email not found. Please try again." });
    }

    // Generate a random 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const resetPasswordCode = new ResetPasswordCode({
      lrn: lrn,
      email: studentEmail,
      code: resetCode, // Assign the generated code to the resetPasswordCode object
    });

    const mailOptions = {
      // from: "noreply@simsv1.com",
      from: {
        name: "SIMSv1 PASSWORD RESET",
        address: "noreply@simsv1.com",
      },
      to: studentEmail,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${resetCode}`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`studentEmail`, studentEmail);
    console.log(`resetCode`, resetCode);

    await resetPasswordCode.save();

    res
      .status(200)
      .json({ message: "Reset password code has been sent to your email." });
  } catch (error) {
    console.error("Error generating reset password code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const resetPasswordFinal = asyncHandler(async (req, res) => {
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
      text: `Password reset successfully.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { resetPassword, resetPasswordFinal };
