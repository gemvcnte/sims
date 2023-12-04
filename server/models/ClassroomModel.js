const { Teacher } = require('../models/TeacherModel')
const mongoose = require('mongoose');

const classroomSchema = mongoose.Schema(
    {
        section: {
            type: String,
            required: true,
        },
        gradeLevel: {
            type: Number,
            required: true,
        },
        adviser: {
            type: String,
            required: true,
        },
        subjects: [
            {
                subjectName: {
                    type: String,
                    required: true,
                },
                teacher: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Teacher',
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = { Classroom };