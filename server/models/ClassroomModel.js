const { Teacher } = require('../models/TeacherModel')
const mongoose = require('mongoose');

const classroomSchema = mongoose.Schema(
    {
        sectionName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        gradeLevel: {
            type: Number,
            required: true,
            validate: function (level) {
                return level >= 11 && level<= 12
            },
            message: 'Grade level must be between 11 and 12'
        },
        adviser: {
            type: String,
            required: true,
        },
        strand: {
            type: String,
            required: true,
            uppercase: true,
        },

        students: [{
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            emailAddress: {
                type: String,
                required: true,
            }
    }],
        subjects: [
            {
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
            },
        ],
    },
    { timestamps: true }
);

classroomSchema.index({'students.firstName': 1, 'students.lastName': 1})

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = { Classroom };