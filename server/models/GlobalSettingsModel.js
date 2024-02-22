const mongoose = require("mongoose");

const GlobalSettingsSchema = mongoose.Schema({
  schoolYear: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    enum: ["first semester", "second semester"],
    required: true,
  },
});

const GlobalSettings = mongoose.model("GlobalSettings", GlobalSettingsSchema);

module.exports = { GlobalSettings };
