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
    // duration: {
    //     type: Number,
    //     required: true,
    //     validate: {
    //         validator: (value) => value > 0,
    //         message: 'Duration must be greater number than 0.',
    //     },
    // },
    createdBy: {
        type: String,
        required: true,
        enum: ['admin', 'teacher']
    },
    typeOfAnnouncement: {
        type: String,
        enum: ['Holiday', 'Exam', 'School Event', 'School Assessment', 'Class Cancellation',]
    },
    // updatedAt: {
    //     type: String,
    //     required: true,
    // },

    isPublic: {
        type: Boolean,
        default: false, 
    },

}, {timestamps: true})


const Announcement = mongoose.model('announcement', announcementSchema)

module.exports = { Announcement }