const mongoose = require('mongoose')


const overAllAnalyticsSchema = mongoose.Schema({
    totalStudents: Number,
    totalTeachers: Number,
    totalSections: Number,
    totalStrands: Number,
    totalAdmins: Number,
    totalApplications: Number,
})


const OverallAnalytics = mongoose.model("Analytics", overAllAnalyticsSchema)

module.exports = { OverallAnalytics }



