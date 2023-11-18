const bcrypt = require('bcrypt')
const { Admin, StudentApplication, Teacher, Student } = require('../models/userModel')
const { Announcement } = require('../models/Announcement')
const generateAuthToken = require('../configs/auth')
const dotenv =require('dotenv')
const asyncHandler = require('express-async-handler')

dotenv.config()



// creating an admin
const createAdmin = asyncHandler(async (req, res) => {
    try {
        const { name, username, password, idNumber, address } = req.body;

        // Check if the admin already exists based on the username
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists with this username.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin with the hashed password
        const admin = new Admin({ name, username, password: hashedPassword, idNumber, address });
        await admin.save();

        res.status(200).json({ message: 'Admin created successfully.' });
    } catch (error) {
        return res.status(500).json({ message: `There is an error ${error}` });
    }
});

// SAMPLE (NOT REALLY NEEDED)
const createStudent = asyncHandler (async (req,res) => {
    try {
        const studentData = req.body

        const existingStudent = await Student.findOne({lrn: studentData.lrn})

        if (existingStudent) {
            return res.status(400).json({message: 'Student already exists with this lrn.'})
        }

//         const student = new Student({
//             firstName, 
//             middleName, 
//             lastName, 
//             extensionName, 
//             birthDate, 
//             gender, 
//             lrn, 
//             schoolYear, 
//             semester, 
//             emailAddress, 
//             fatherName, 
//             fatherContactNumber, 
//             motherName, 
//             motherContactNumber, 
//             guardianName, 
//             guardianContactNumber, 
//             guardianRelationship, 
//             lrn, 
//             schoolYear, 
//             track, 
//             strand,
//             password: hashedPassword
// })



const student = new Student({
    firstName: studentData.firstName,
    middleName: studentData.middleName,
    lastName: studentData.lastName, 
    extensionName: studentData.extensionName, 
    birthDate: studentData. birthDate,
    gender: studentData.gender,
    lrn: studentData.lrn,
    schoolYear: studentData.schoolYear,
    semester: studentData. semester,
    emailAddress: studentData.emailAddress,
    fatherName: studentData.fatherName,
    fatherContactNumber: studentData.fatherContactNumber,
    motherName: studentData.motherName,
    motherContactNumber: studentData.motherContactNumber,
    guardianName: studentData.guardianName,
    guardianContactNumber: studentData.guardianContactNumber,
    guardianRelationship: studentData.guardianRelationship,
    lrn: studentData.lrn,
    schoolYear: studentData.schoolYear,
    track: studentData.track,
    strand: studentData.strand,
    password: hashedPassword,
})
        await student.save()

        res.status(200).json({message: 'Student account created successfully'})
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})



const createTeacher = asyncHandler(async (req, res) => {
    try {
        const teacherData = req.body;

        // Check if the teacher already exists based on the username
        const existingTeacher = await Teacher.findOne({ username: teacherData.username });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher already exists with this username.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(teacherData.password, 10);

        /* not yet sure hashed password
        const hashedPassword = await bcrypt.hash(teacherData.birthDate, 10)
        
        */

        // Create a new teacher with the hashed password
        const teacher = new Teacher({
            firstName: teacherData.firstName,
            middleName: teacherData.middleName,
            lastName: teacherData.lastName,
            currentAddress: teacherData.currentAddress,
            birthDate: teacherData.birthDate,
            gender: teacherData.gender,
            emailAddress: teacherData.emailAddress,
            username: teacherData.username,
            password: hashedPassword,
        });

        await teacher.save();

        res.status(200).json({ message: 'Teacher created successfully.' });
    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }
});



// logging in as an admin
const adminLogin = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const tokenPayload = {
            _id: admin.id,
            username: admin.username,
            role: 'admin',
        }


        const token = generateAuthToken(tokenPayload);

        res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }
});




// updating admin 
const updateAdmin = asyncHandler(async (req, res) => {
    try {
    const { username, password, ...updateData } = req.body;

      // hahanapin yung username tapos iupdate niya
    const updatedAdmin = await Admin.findOneAndUpdate({ username }, updateData, { new: true });

      // pede iupdate yung password kung pinrovide niya 
    if (password) {
        updatedAdmin.password = password;
        await updatedAdmin.save();
}

    res.json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deleteAdmin = asyncHandler (async (req,res) => {
    try {
        const { username } = req.body

        await Admin.findOneAndDelete({username})

        return res.status(200).json({message: 'Admin deleted successfully'})

    } catch (error) {
        return res.status(500).json({message: `There is an error ${error}`})
    }
});




const acceptStudentApplication = asyncHandler(async (req,res) => {
        try {
            const applicationData = req.body;

            const studentEnrolled = new studentEnrolled(applicationData)

            await studentEnrolled.save()

            await StudentApplication.findByIdAndUpdate(applicationData.__id, {status: 'enrolled'})

            res.status(200).json({message: 'Student Enrolled'})
        } catch (error) {
            return res.status(500).json({message: `There is an error ${error}`})
        }
})


    // const createTeacher = asyncHandler(async (req, res) => {
    //     try {
    //         const teacherData = req.body;
    
    //         // Check if the teacher already exists based on the username
    //         const existingTeacher = await Teacher.findOne({ username: teacherData.username });
    //         if (existingTeacher) {
    //             return res.status(400).json({ message: 'Teacher already exists with this username.' });
    //         }
    
    //         // Hash the password
    //         const hashedPassword = await bcrypt.hash(teacherData.password, 10);
    
    //         // Create a new teacher with the hashed password
    //         const teacher = new Teacher({
    //             firstName: teacherData.firstName,
    //             middleName: teacherData.middleName,
    //             lastName: teacherData.lastName,
    //             currentAddress: teacherData.currentAddress,
    //             birthDate: teacherData.birthDate,
    //             gender: teacherData.gender,
    //             emailAddress: teacherData.emailAddress,
    //             username: teacherData.username,
    //             password: hashedPassword,
    //         });
    
    //         await teacher.save();
    
    //         res.status(200).json({ message: 'Teacher created successfully.' });
    //     } catch (error) {
    //         res.status(500).json({ message: `${error}` });
    //     }
    // });
    
    

    const updateTeacher = asyncHandler (async (req,res) => {
        try {
            const {username, password, ...updateData} = req.body


            const updatedTeacher = await Teacher.findOneAndUpdate({username}, updateData, {new: true})


            if (password) {
                updatedTeacher.password = password
                await updatedTeacher.save()

                res.json({message: 'Teacher updated successfully.', admin: updatedTeacher})
            }
        } catch (error) {   
            res.status(500).json({message: `${error}`})
        }
});


    const deleteTeacher = asyncHandler(async (req,res) => {
        try {
            const {username} = req.body

            await Teacher.findOneAndDelete({username})

            res.status(200).json({message: 'Teacher has been delete successfully.'})
        } catch (error) {
            res.status(500).json({message: `${error}`})
        }
})


    const getAllStudents = asyncHandler(async (req,res) => {
        try {
            const students = await Student.find()

            res.json({message: 'All students data retrieved successfully', data: students})
        } catch (error) {
            res.status(500).json({message: `${error}`})
        }
});

    
    const getAllTeachers = asyncHandler(async (req,res) => {
        try {
            const teachers = await Teacher.find()

            res.json({message: 'The teachers data retrieved successfully', data: teachers})
        } catch (error) {
            res.status(500).json({message: `${error}`})
        }
})


const getAllPending = asyncHandler(async (req,res) => {
    try {
        const findPending = await StudentApplication.find({ status: 'PENDING' || 'pending'})


        res.json({message: 'Pending records retrieved successfully ', data: findPending})
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})


const createAnnouncement = asyncHandler(async (req,res) => {
    try {
        const {title, content} = req.body

        const announcement = new Announcement({
            title,
            content,
            // createdBy: req.user.username,
        })

        await announcement.save()

        res.status(201).json({message: 'Announcement created successfully.', data: announcement})
        // const announcement =
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
})


const updateAnnouncement = asyncHandler(async (req,res) => {
    try {
        const {title, content,} = req.body
    } catch (error) {
        res.json({message: `${error}`})
    }
})

module.exports = {  
    createAdmin, 
    adminLogin, 
    updateAdmin, 
    deleteAdmin, 
    acceptStudentApplication, 
    createTeacher, 
    updateTeacher, 
    deleteTeacher, 
    getAllStudents,
    createStudent,
    getAllTeachers,
    getAllPending,
    createAnnouncement,
}