const asyncHandler = require("express-async-handler");
const ResetPasswordCode = require("../models/ResetPasswordCodeModel");
const { Student } = require("../models/StudentModel");
const { transporter } = require("../mailer");

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

module.exports = { resetPassword };
