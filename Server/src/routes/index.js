const express = require("express");
const router = express.Router();
const {getUsers} = require("../controllers/user");

const {register, login, checkAuth} = require("../controllers/auth");

// Middleware
const {auth} = require("../middlewares/auth");

// Route User
router.get("/users", getUsers);

// Route Auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
