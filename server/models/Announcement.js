const mongoose = require('mongoose')


const adminAnnouncementSchema = mongoose.Schema({
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
    },
    createdBy: {
        type: String,
        required: true,
        enum: ['admin', 'teacher']
    },
    typeOfAnnouncement: {
        type: String,
        enum: ['holiday', 'exam', 'event', 'classCancelation',],
    },
    createdAt: Date,
    // updatedAt: {
    //     type: String,
    //     required: true,
    // },

}, {timestamps: true})


const Announcement = mongoose.model('announcement', adminAnnouncementSchema)

module.exports = { Announcement }