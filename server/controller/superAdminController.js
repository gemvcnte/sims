const bcryptjs = require('bcryptjs');
const generateAuthToken = require('../configs/auth');
const generateEmailTemplate = require('../templates/emailTemplate');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { SuperAdmin } = require('../models/superAdminModel');
const { Admin } = require('../models/AdminModel');
const { Student } = require('../models/StudentModel');
const { Teacher } = require('../models/TeacherModel');
const { Classroom } = require('../models/ClassroomModel');
const { Announcement } = require('../models/Announcement')

dotenv.config();




const createSuperAdmin = asyncHandler(async (req, res) => {
  try {
    const superAdmin = req.body;

    const cleanedFirstName = superAdmin.firstName.replace(/\s/g, "");
    const cleanedLastName = superAdmin.lastName.replace(/\s/g, "");

    const username = (
      cleanedFirstName + "." + cleanedLastName
    ).toLowerCase();


    const existingAdmin = await SuperAdmin.findOne({
      username: username
    })

    if (existingAdmin) {
      res.status(400).json({ message: 'Admin already exists with this username.' })
    }


    const hashedPassword = await bcryptjs.hash(superAdmin.birthDate, 10);

    const createdAdmin = new SuperAdmin({
      ...superAdmin,
      password: hashedPassword,
    });

    await createdAdmin.save();

    res.status(201).json({ message: "Super Admin has been created." });


  } catch (error) {
    res.status(500).json({ message: 'Internal server error, Please try again later.' });
  }
})


const updateSuperAdmin = asyncHandler(async (req, res) => {
  try {

    const { username, password, ...updateData } = req.body;

    const updatedAdmin = await Admin.findOneAndUpdate(
      { username },
      updateData,
      { new: true }
    );

    if (password) {
      updatedAdmin.password = password;
      await updatedAdmin.save();
    }

    res.status(200).json({ message: 'Admin updated successfully.', admin: updatedAdmin })


  } catch (error) {
    res.status(500).json({ message: 'Internal server error, Please try again later.' })
  }
})


const updateSuperAdminProfile = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const updatedProfileData = req.body

    if (_id !== updatedProfileData._id) {
      return res.status(403).json({ message: "Forbidden: You do not have the permission to update this profile." })
    }

    const adminProfile = await SuperAdmin.findByIdAndUpdate(
      _id,
      updatedProfileData,
      { new: true }
    );

    if (!adminProfile) {
      res.status(404).json({ message: 'Super Admin not found.' });
    }

    res.status(200).json({ message: "Super Admin profile updated successfully." });


  } catch {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})

const deleteSuperAdmin = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body;

    const findSuperAdmin = await SuperAdmin.findOneAndDelete({ username });


    if (!findSuperAdmin) {
      res.status(404).json({ message: 'Super Admin not found.' })
    }

    res.status(200).json({ message: 'Super Admin has been deleted ' })

  } catch {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})


const getAllSuperAdmins = asyncHandler(async (req, res) => {
  try {
    const superAdmins = await SuperAdmin.find();

    if (!superAdmins) {
      res.status(404).json({ message: 'Super Admin/s not found.' })
    }


    res.status(200).json({
      message: 'Super Admin/s found.',
      data: superAdmins
    })

  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
});

const getSpecificSuperAdmin = asyncHandler(async (req, res) => {
  try {

    const { id } = req.params;

    const specificSuperAdmin = await SuperAdmin.findById(id);

    if (!specificSuperAdmin) {
      res.status(404).json({ message: 'Super Admin not found.' });
    }


    res.status(200).json({
      message: 'Super Admin found.',
      data: specificSuperAdmin
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})

const superAdminLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ username });

    if (!superAdmin) {
      res.status(404).json({ message: 'Super Admin not found.' })
    }


    const passwordMatch = await bcryptjs.compare(password, superAdmin.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid username or password." });
    }

    const tokenPayload = {
      _id: superAdmin.id,
      username: superAdmin.username,
      fullName: `${superAdmin.firstName} ${superAdmin.lastName}`,
      role: "super admin",
    }

    const token = generateAuthToken(tokenPayload);

    res.status(200).json({ message: 'Login successfully.', token });
  } catch {
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
})


const createAdmin = asyncHandler(async (req, res) => {
  try {

    const admin = req.body;


    const cleanedFirstName = admin.firstName.replace(/\s/g, '');
    const cleanedLastName = admin.lastName.replace(/\s/g, '');

    const username = (cleanedFirstName + "." + cleanedLastName).toLowerCase();

    const existingAdmin = await Admin.findOne({
      username: username
    })

    if (existingAdmin) {
      res.status(400).json({ message: 'Admin already exists with this username.' })
    }

    const hashedPassword = await bcryptjs.hash(admin.birthDate, 10)


    const adminData = new Admin({
      ...admin,
      username: username,
      password: hashedPassword,
    })

    await adminData.save();
    res.status(201).json({ message: 'Admin created.' });
  } catch {
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
})



const updateAdmin = asyncHandler(async (req, res) => {
  try {

    const { username, password, ...updatedData } = req.body;

    const updatedAdmin = await Admin.findOneAndUpdate({ username }, updatedData, { new: true });

    if (password) {
      updatedAdmin.password = password,
        await updatedAdmin.save();
    }

    res.status(200).json({ message: `${username} has been updated.` })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})


const updateAdminProfile = asyncHandler(async (req, res) => {
  try {


    const { id } = req.user;


    const updatedProfileData = req.body;


    if (id !== updatedProfileData.id) {
      res.status(403).json({
        message: 'Forbidden: You do not have the permission to update this profile'
      })
    }

    const adminProfile = await Admin.findByIdAndUpdate(id, updatedProfileData, { new: true });


    if (!adminProfile) {
    }
    res.status(404).json({ message: 'Admin not found.' });


    res.status(200).json({ message: 'Admin profile updated successfully.' });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})


const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    // base ko nalang muna sa id
    const { id } = req.body;


    const findAdminAndDelete = await Admin.findOneAndDelete(id);

    if (!findAdminAndDelete) {
      res.status(404).json({ message: 'Admin not found.' })
    }
    res.status(200).json({ message: 'Admin has been deleted.' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})


const getAllAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find()

    if (!admins) {
      res.status(404).json({ message: 'Admin data is empty.' });
    }

    res.status(200).json({
      message: 'Admin/s found.',
      data: admins
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})


const getSpecificAdmin = asyncHandler(async (req, res) => {
  try {
    // id muna pede naman username nalang mamaya
    const { id } = req.params;

    const findSpecificAdmin = await Admin.findOne(id);

    if (!findSpecificAdmin) {
      res.status(404).json({ message: 'Admin not found.' });
    }

    res.status(200).json({
      message: 'Admin found.',
      data: findSpecificAdmin
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})


const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ username })

    if (!admin) {
      res.status(404).json({ message: 'Admin not found.' })
    }

    const passwordMatch = await bcryptjs.compare(password, admin.password);

    if (!passwordMatch) {
      res.status(400).json({ message: 'Invalid username or password.' });
    }


    const tokenPayload = {
      _id: admin.id,
      username: admin.username,
      fullName: `${admin.firstName} ${admin.lastName}`,
      role: "admin"
    }

    const token = generateAuthToken(tokenPayload);

    res.status(200).json({ message: 'Login successfully.', token })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})

const createTeacher = asyncHandler(async (req, res) => {
  try {
    const teacher = req.body

    const teacherFirstName = teacher.firstName.replace(/\s/g, "");
    const teacherLastName = teacher.lastName.replace(/\s/g, "");

    const username = `${teacherFirstName}.${teacherLastName}`

    const existingTeacher = await Teacher.findOne(username);

    if (existingTeacher) {
      res.status(400).json({ message: 'Admin already exists with this username.' });
    }

    res.status(201).json({message: 'Teacher created successfully.'});
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error. Please try again later.'
    })
  }
})


const updateTeacher = asyncHandler(async (req, res) => {
  try {
    const { username, password, ...updatedData } = req.body;

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { username },
      updatedData,
      { new: true }
    );


    if (password) {
      updatedTeacher.password = password,
      await updatedTeacher.save();
    }

    res.status(200).json({message: 'Teacher updated successfully.'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. Please try again later.' })
  }
})


const updateTeacherProfile = asyncHandler(async(req,res) => {
  try {
    const { _id } = req.user;
    const updatedProfileData = req.body;

    if (_id !== updatedProfileData._id) {
      res.status(403).json(
        {message: 'Forbidden: You do not have the permission to edit this profile.'}
      )
    }

    const teacherProfile = await Teacher.findOneAndUpdate(
      _id,
      // use set para maupdate lang yung specified fields na needed
      {$set: updatedProfileData},
      {new: true}
    )

    if (!teacherProfile) {
      res.status(404).json({ message: 'Teacher not found.'})
    }

    res.status(200).json({message: 'Admin profile updated successfully.'});

  } catch (error) {
    res.status(500).json({message: 'Internal server error. Please try again later.'})
    
  }
})


const deleteTeacher = asyncHandler(async(req,res) => {
  try {
   const { username }  = req.body;

    const teacher = await Teacher.findOneAndDelete(username);

    if (!teacher) {
      res.status(404).json({message: 'Teacher not found.'});
    }

    res.status(202).json({message: 'Teacher has been deleted.'});
  } catch (error) {
    res.status(500).json({message: 'Internal server error. Please try again later.'})
  }
})


const getAllTeachers = asyncHandler(async(req,res) => {
  try {
    const teachersData = await Teacher.find();
    const adminsData = await Admin.find();

    const allTeachers = [...teachersData, ...adminsData];

    allTeachers.sort((a,b) => {
      const fullNameTeacher = `${a.lastName}, ${a.firstName}`
      const fullNameAdmin = `${b.lastName}, ${b.firstName}`
      return fullNameTeacher.localeCompare(fullNameAdmin);      
    });

    const modifieddata = allTeachers.map((teacher) => {
      username: teacher.username,
      fullName: `${teacher.lastName}, ${teacher.firstName}`
    });

    res.status(200).json({message: 'Teachers data retrieved successfully.'});

  } catch (error) {
    res.status(500).json({message: 'Internal server error. Please try again later.'})
  }
})


const getSpecificTeacher = asyncHandler(async(res,req) => {
  try {
    const { id } = req.params

    const teacher = await Teacher.findById(_id: id)

    if (!teacher) {
      res.status(404).json({message: 'Teacher not found.'});
    }

    res.status(200).json({
      message: 'Teacher found.',
      data: teacher,
    })
  } catch (error) {
    res.status(500).json({message: 'Internal server error. Please try again later.'});
  }
})

const teacherLogin = asyncHandler(async(req,res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      res.status(404).json({message: 'Teacher not found.'})
    }

    const passwordMatch = await bcryptjs.compare(password)

    if(!passwordMatch) {
      res.status(400).json({message: 'Invalid username or password.'})
    }

    const tokenPayload = {
      _id: teacher.id,
      username: teacher.username,
      fullName: `${teacher.firstName} ${teacher.lastName}`,
      role: 'teacher',
    }

    const token = generateAuthToken(tokenPayload);

    res.status(200).json({message: 'Login successfully.', token})
  } catch (error) {
   res.status(500).json({message: 'Internal server error. Please try again later.'})
  }
})


module.exports = {
  createSuperAdmin,
  updateSuperAdmin,
  updateSuperAdminProfile,
  deleteSuperAdmin,
  getAllSuperAdmins,
  getSpecificSuperAdmin,
  superAdminLogin,
  createAdmin,
  updateAdmin,
  updateAdminProfile,
  deleteAdmin,
  getAllAdmins,
  getSpecificAdmin,
  adminLogin,
  createTeacher,
  updateTeacher,
  updateTeacherProfile,
  deleteTeacher,
  getAllTeachers,
  getSpecificTeacher,


}
