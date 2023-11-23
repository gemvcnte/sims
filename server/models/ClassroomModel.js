const mongoose = require('mongoose');


const classroomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    adviser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    ],
    announcements: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, {timestamps: true})


const Classroom = mongoose.model('Classroom', classroomSchema)

module.exports = { Classroom }


