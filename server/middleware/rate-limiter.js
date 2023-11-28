const rateLimit = require("express-rate-limit");
const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs to milliseconds
  message: "You have exceeded the 200 requests in 24 hrs limit!",
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const rateLimiterConfig = {
  admin: {
    ...rateLimiter,
    max: 500, // 500 requests limit
    message: "You have exceeded the 500 requests in 24hrs limit.", //message for the admin
  },
  teacher: {
    ...rateLimiter,
    max: 300, // 300 request limit
    message: "You have exceeded the 300 requests in 24hrs limit.", //message for the teacher
  },
  student: {
    ...rateLimiter,
    // max: 200, // 200 request limit
    max: 300, // 200 request limit (testing)
    message: "You have exceeded the 200 requests in 24hrs limit.", //message for the student
  },
};

function getRateLimiter(role) {
  const config = rateLimiterConfig[role] || rateLimiterConfig.student;
  return rateLimit(config);
}

module.exports = getRateLimiter;
