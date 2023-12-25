const bcryptjs = require('bcryptjs');
const generaeAuthToken = require('../configs/auth');
const generateEmailTemplate = require('../templates/emailTemplate');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { SuperAdmin } = require('../models/superAdminModel');
const { Admin } = require('../models/AdminModel');
const { Student } = require('../models/StudentModel');
const { Teacher } = require('../models/TeacherModel');
const { Classroom } = require('../models/ClassroomModel');

dotenv.config();




const createSuperAdmin =  asyncHandler(async (req,res) => {
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
            res.status(400).json({message:'Admin already exists with this username.'})
        }

        if (!existingAdmin) {
            res.status(404).json({message: "Admin doesn't exists."});
        }

        const hashedPassword = await bcryptjs.hash(superAdmin.birthDate, 10);

        const createdAdmin = new SuperAdmin({
            ...superAdmin,
            password: hashedPassword,
        });

        await createdAdmin.save();

        res.status(201).json({message: "Super Admin has been created."});

        
    } catch (error) {
        res.status(500).json({messaeg: 'Internal server error.', error});
    }
})


const updateSuperAdmin = asyncHandler(async (req,res) => {
	try {
		const { _id } = req.body
		const updatedProfileData = req.body

		if (_id !== updatedProfileData._id) {
			return res.status(403).json({message: "Forbidden: You do not have the permission to update this profile."})
		}

		const adminProfile = await SuperAdmin.findByIdAndUpdate(
			_id,
			updatedProfileData,
			{new: true}
		);

		if (!adminProfile) {
			res.status(404).json({message: 'Super Admin not found.'});
		}

		res.status(200).json({message: "Super Admin profile updated successfully."});


	} catch {
		res.status(500).json({message: 'Internal server error. Please try again later.'})
	}
})

const deleteSuperAdmin = asyncHandler(async (req,res) => {
	try {
		const { username } = req.body;

		const findSuperAdmin = await SuperAdmin.findOneAndDelete({ username });

		
		if (!findSuperAdmin) {
			res.status(404).json({message: 'Super Admin not found.'})
		}

		res.status.(200).json({message: 'Super Admin has been deleted '})





	} catch {
		res.status(500).json({message: 'Internal server error. Please try again later.'})
	}
})

	const superAdminLogin = asyncHandler(async (req,res) => {
		try {
			const { username, password } = req.body;

			const superAdmin = await SuperAdmin.findOne({username});

			if (!superAdmin) {
				res.status(404).json({message: 'Super Admin not found.'})
			}


			const hashedPassword = await bcryptjs.compare(password, superAdmin.password);

			if (!hashedPassword) {
				res.status(401).json({ message: "Invalid username or password." });
			}

			const tokenPayload = {
				_id: superAdmin.id,
				username: superAdmin.username,
				fullName: `${superAdmin.firstName} ${superAdmin.lastName}`,
				role: "super admin",
			}

			const token = generateAuthToken(tokenPayload);

			res.status(200).json({message: 'Login successfully.', token});
		} catch {
			res.status(500).json({message: 'Internal server error. Please try again later.'});
		}
	})


const createAdmin = asyncHandler(async (req,res) => {
	try {

		const admin = req.body;


		const cleanedFirstName = admin.firstName.replace(/\s/g, '');
		const cleanedLastName = admin.lastName.replace(/\s/g, '');

		const username = (cleanedFirstname + "." + cleanedLastName);


		res.status(201).json({message: 'Admin created.'});
	} catch {
		res.status(500).json({message: 'Internal server error. Please try again later.'});
	}
}) 
