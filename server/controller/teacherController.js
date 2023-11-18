const { Teacher } = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const generateAuthToken = require('../configs/auth')
const bcrypt = require('bcrypt')

const teacherLogin = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        // find yung teacher base sa uname
        const teacher = await Teacher.findOne({ username });

        // check if the teacher exists
        if (!teacher) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, teacher.password);

        // Check if the passwords match
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }


        const token = generateAuthToken(teacher)

        res.json({ message: 'Login Successfully.', token });
    } catch (error) {
        console.error(`There is an error ${error}`);
        return res.status(500).json({ message: 'Login failed.' });
    }
});



module.exports = {
  teacherLogin
}
