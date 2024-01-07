const mongoose = require("mongoose");

const gradesSchema = new.mongoose.Schema({
	createdBy: {
		type: String,
		required: String,
	},
	quizResult: {
		type: Array,
		required: true,
	},
	examResult: {
		type: Array,
		required: true,
	},
	writtenResult: {
		type: Array,
		required: true,
	},



})


const Grades = mongoose.model('grades', gradesSchema)

module.exports = { Grades}
