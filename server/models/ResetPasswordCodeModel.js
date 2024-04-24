const mongoose = require("mongoose");

const ResetPasswordSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  // lrn: {
  //   type: String,
  // },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ResetPasswordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const ResetPasswordCode = mongoose.model(
  "ResetPasswordCode",
  ResetPasswordSchema
);

module.exports = ResetPasswordCode;
