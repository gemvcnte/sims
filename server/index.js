// import not valid cause es6
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./db/database");
const dbConn = require("./db/dbConnection");
const helmet = require("helmet");
const morgan = require("morgan");
const getRateLimiter = require("./middleware/rate-limiter");

connectDb();
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], //  default source for content not explicitly allowed in other directives.
        scriptSrc: ["'self'", "'unsafe-inline'"], //specifies valid sources for js code.
        styleSrc: ["'self'"], // valid sources for stylesheets only
        fontSrc: ["'self'"], //valid sources for fonts only
        imgSrc: ["'self'"], //valid sources for images
        objectSrc: ["'none'"], //valid sources of embedded objects.
        mediaSrc: ["'none'"], //valid sources for media files
        frameSrc: ["'none'"], //valid sources for frames
        frameAncestors: ["'none'"], //valid sources for the ancestor sources for embedded frames
      },
    },
  })
);
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cookieParser());
// app.use(rateLimiter)

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Define your routes and API endpoints here
// app.get('/', (req, res) => {
//     res.send('Hello, this is your Express server!');
// });

const adminRateLimiter = getRateLimiter("admin");
const teacherRateLimiter = getRateLimiter("teacher");
const studentRateLimiter = getRateLimiter("student");

// Apply @ school
const studentApplicationRoute = require("./routes/studentApplicationRoute");
app.use("/apply", studentApplicationRoute);

const resetPasswordRoute = require("./routes/resetPasswordRoute");
app.use("/reset", resetPasswordRoute);

const facultyRoute = require("./routes/facultyRoute");
app.use("/faculty", facultyRoute);

// Announcements for Login Page
const publicAnnouncementRoute = require("./routes/publicAnnouncementRoute");
app.use("/announcement", publicAnnouncementRoute);

// Admin routes
const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRateLimiter, adminRoute);

// Student routes
const studentRoute = require("./routes/studentRoute");
app.use("/student", studentRateLimiter, studentRoute);

// Teacher routes
const teacherRoute = require("./routes/teacherRoute");
app.use("/teacher", teacherRateLimiter, teacherRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
