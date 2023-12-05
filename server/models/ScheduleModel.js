const mongoose = require('mongoose')


const scheduleSchema = mongoose.Schema({
    subjectTitle: {
        type: String,
        required: true,
    },
    days: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
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
})

const Schedule = mongoose.model('schedule', scheduleSchema )

module.exports = {Schedule}