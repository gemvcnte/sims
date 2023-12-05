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
    //     subjects: [
    //         {
    //             subjectName: {
    //                 type: String,
    //                 required: true,
    //             },
    //             teacher: {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: 'Teacher',
    //                 required: true,
    //             },
    //         },
    //     ],
},
    { timestamps: true }
);

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = { Classroom };