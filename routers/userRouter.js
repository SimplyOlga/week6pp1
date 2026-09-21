const express = require("express");
const requireAuth = require("../middleware/requireAuth");


const router = express.Router();
const { loginUser, signupUser, getMe} = require("../controllers/userController");
  
// login route
router.post("/login", loginUser);
  
// signup route
router.post("/signup", signupUser);
//me
router.get("/me", requireAuth, getMe);
module.exports = router;

