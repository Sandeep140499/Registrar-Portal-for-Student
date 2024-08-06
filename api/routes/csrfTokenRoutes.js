const express = require("express");
const csrf = require("csurf");

function setupCSRFProtection() {
  const router = express.Router();

  // Initialize csurf middleware
  const csrfProtection = csrf({ cookie: true });

  // CSRF error handling middleware
  router.use((err, req, res, next) => {
    if (err.code !== "EBADCSRFTOKEN") return next(err);
    console.log(req.body, "lskadkfjs");
    // handle CSRF token errors here
    res.status(403).json({ error: "Invalid CSRF token" });
  });

  // GET route for obtaining CSRF token
  router.get("/csrf-token", csrfProtection, (req, res) => {
    const newCsrfToken = req.csrfToken();

    // Set expiration time for the CSRF token (30 minutes)
    const expiryTime = 30 * 60 * 1000; // 30 minutes in milliseconds
    res.cookie("XSRF-TOKEN", newCsrfToken, {
      maxAge: expiryTime,
      httpOnly: true,
    });

    // Respond with the CSRF token
    res.json({ csrfToken: req.csrfToken() });
  });

  return router;
}

module.exports = setupCSRFProtection;
