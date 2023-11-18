// import not valid cause es6
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./db/database')
const dbConn = require('./db/dbConnection')

connectDb()
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json())


// Define your routes and API endpoints here
// app.get('/', (req, res) => {
//     res.send('Hello, this is your Express server!');
// });

// Apply @ school
const studentApplicationRoute = require('./routes/studentApplicationRoute');
app.use('/apply', studentApplicationRoute);

// Admin routes
const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);

// Student routes
const studentRoute = require('./routes/studentRoute');
app.use('/student', studentRoute);

// Teacher routes
const teacherRoute = require('./routes/teacherRoute');
app.use('/academic', teacherRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
