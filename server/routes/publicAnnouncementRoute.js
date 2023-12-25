const express = require("express");
const router = express.Router();
const { Announcement } = require("../models/Announcement");

router.get("/", async (req, res) => {
  try {
    const publicAnnouncements = await Announcement.find();

    if (!publicAnnouncements) {
      res.status(404).json({message: 'No Announcements for today.'});
    }

    res.status(200).json({
      message: "Public Announcements retrieved successfully",
      data: publicAnnouncements,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
});

module.exports = router;
