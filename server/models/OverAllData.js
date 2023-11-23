const mongoose = require('mongoose')


const overAllAnalyticsSchema = mongoose.Schema({
    totalStudents: String,
    totalTeachers: String,
    totalSections: String,
    totalStrands: String,
})


const OverallAnalytics = mongoose.model("Analytics", overAllAnalyticsSchema)

module.exports = { OverallAnalytics }



