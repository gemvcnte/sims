const { StudentApplication } = require("../models/StudentApplicationModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");

const applyStudent = asyncHandler(async (req, res) => {
  try {
    const registrationData = req.body;


    const hashedPassword = await bcryptjs.hash(registrationData.birthDate, 12);

    registrationData.registrationDate = new Date();
    registrationData.password = hashedPassword;

    const student = new StudentApplication(registrationData);
    const savedStudent = await student.save();

    res.json({ message: "Personal information saved", student: savedStudent });
  } catch (err) {
    res.status(500).json({message: `${err}` });
  }
});


// });

module.exports = { applyStudent };


    // const validationError = validateRegistrationData(registrationData);
    // if (validationError) {
    // return res.status(400).json({ error: validationError });
    // }


//const validateRegistrationData = (data) => {
// const requiredFields = [
//     'firstName',
//     'middleName',
//     'lastName',
//     'extensionName',
//     'birthDate',
//     'gender',
//     'currentAddress',
//     'emailAddress',
//     'fatherName',
//     'fatherContactNumber',
//     'motherName',
//     'motherContactNumber',
//     'lrn',
//     'schoolYear',
//     'semester',
//     'track',
//     'strand',
// ];

// for (const field of requiredFields) {
//     if (!data[field]) {
//     return `Missing ${field}`;
//     }
// }

// return null;
// };

// if (!registrationData.guardianName || !registrationData.guardianContactNumber || registrationData.guardianRelationship !== 'studentApplication') {
// registrationData.guardianName = 'none';
// registrationData.guardianContactNumber = 'none';
// registrationData.guardianRelationship = 'none';
// }




// const applyStudent = asyncHandler(async(req, res) => {
//     try {
//         const registrationData = req.body;

//         // Hash the birthDate field
//         const hashedBirthDate = await bcryptjs.hash(registrationData.birthDate, 10);

//         // Update the birthDate with the hashed value
//         registrationData.birthDate = hashedBirthDate;

//         // Set registrationDate to the current date
//         registrationData.registrationDate = new Date();

//         // Create a new StudentApplication instance
//         const student = new StudentApplication(registrationData);

//         // Save the student to the database
//         const savedStudent = await student.save();

//         // Respond with a success message and the saved student data
//         res.json({ message: "Personal information saved", student: savedStudent });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to save personal information' + `${err}` });
//     }