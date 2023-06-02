const express = require("express");
const router = express.Router();
//Importing functions from auth controller
const { login, register, userProfile, users} = require("../controllers/auth.controller")
//Importing the JWT verifyer from auth middleware 
const verifyToken = require("../middleware/auth.middleware") 

//Register route with register validation 
router.post("/register", register);
//Login route with register validation
router.post("/login", login);
//Profile route with register validation
router.get("/profile/:id", verifyToken, userProfile);
//all users route with 
router.get("/users", verifyToken, users);

module.exports = router;