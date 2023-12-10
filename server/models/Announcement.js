const mongoose = require('mongoose')


const announcementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Duration must be a positive number.',
        },
    },
    createdBy: {
        type: String,
        required: true,
        enum: ['admin', 'teacher', 'unknown']
    },
    typeOfAnnouncement: {
        type: String,
        enum: ['holiday', 'exam', 'event', 'classCancelation',],
    },
    // updatedAt: {
    //     type: String,
    //     required: true,
    // },

}, {timestamps: true})


const Announcement = mongoose.model('announcement', announcementSchema)

module.exports = { Announcement }