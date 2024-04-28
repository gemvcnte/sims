const mongoose = require("mongoose");

const classroomSchema = mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    gradeLevel: {
      type: Number,
      required: true,
      validate: function (level) {
        return level >= 11 && level <= 12;
      },
      message: "Grade level must be between 11 and 12",
    },
    adviser: {
      type: String,
      required: true,
    },
    schoolYear: {
      type: String,
      required: false,
    },
    semester: {
      type: String,
      required: false,
    },

    strand: {
      type: String,
      required: true,
    },

    students: [
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        lrn: {
          type: String,
          required: true,
        },
      },
    ],
    subjects: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        subjectName: {
          type: String,
          required: true,
        },
        subjectTeacher: {
          type: String,
          required: true,
        },
        schedules: [
          {
            subjectId: {
              type: mongoose.Schema.Types.ObjectId,
              default: function () {
                return this.parent().id;
              },
            },
            day: {
              type: String,
              required: true,
            },
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
          },
        ],
        grades: [
          {
            lrn: {
              type: String,
              required: true,
            },
            p1Grade: {
              type: String,
              required: false,
            },
            p2Grade: {
              type: String,
              required: false,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

classroomSchema.index({ "students.firstName": 1, "students.lastName": 1 });

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = { Classroom };
