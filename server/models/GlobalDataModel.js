const mongoose = require("mongoose");

const globalDataSchema = new mongoose.Schema({
  schoolYear: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
    enum: ["first semester", "second semester"],
  },
});

const GlobalData = mongoose.model("globals", globalDataSchema);
