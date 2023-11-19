const mongoose =require('mongoose')


const announcementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
        // role: 'admin',
        // enum: ['admin', 'teacher']
    },
}, {timestamps: true})


const Announcement = mongoose.model('announcement', announcementSchema)

module.exports = {Announcement}