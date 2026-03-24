// const express=require('express');
// const adminController = require('../controllers/AdminController.js');
const adminmiddleware = require("../middleware/adminmiddleware.js");
// ;
// const router=express.Router();


// router.get("/registration", adminController.registration)
// router.post("/registration", adminController.registrationstore)

// router.get('/adminlogin/view',adminController.login)
// router.post('/adminlogin/create',adminController.logincreate)

// router.get('/listadmin',adminmiddleware,adminController.adminCheck,adminController.listadmin)
// router.get('/addadmin',adminmiddleware, adminController.addadmin)
// router.post('/storeadmin',adminmiddleware, adminController.storeadmin)

// router.get('/geteditadmin/:id',adminmiddleware, adminController.geteditadmin)
// router.post('/editadmin/:id',adminmiddleware, adminController.editadmin)

// router.get('/viewadmin/:id',adminmiddleware, adminController.viewadmin)

// router.post('/deleteadmin/:id',adminmiddleware, adminController.deleteadmin)

// router.get('/logoutadmin',adminmiddleware,adminController.logoutadmin)


// module.exports=router



const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AdminController.js");


// Registration form (only admin)
router.get("/registration",adminController.registration);

// Store new user (admin creates)
router.post("/registration/store", adminController.registrationstore);


// Admin login page
router.get("/adminlogin/view", adminController.adminlogin);

// Admin login action
router.post("/adminlogin/create", adminController.adminlogincreate);




// List employees
router.get("/employee/listemployee",adminmiddleware,adminController.adminCheck, adminController.listemployee);

// Add employee form
router.get("/employee/addemployee",adminmiddleware,adminController.addemployee);

// Store employee
router.post("/employee/storeemployee",adminmiddleware,adminController.storeemployee);

// Edit employee page
router.get("/employee/edit/:id",adminmiddleware,adminController.geteditemployee);

// Update employee
router.post("/employee/edit/:id",adminmiddleware,adminController.editemployee);

// View employee
router.get("/employee/view/:id",adminmiddleware,adminController.viewemployee);

// Delete employee
router.get("/employee/delete/:id",adminmiddleware,adminController.deleteemployee);



router.get("/profile",adminController.getme);



// Refresh token
router.get("/refresh-token", adminController.refreshToken);
router.post("/employee/sendotp", adminController.sendOTP); // sends OTP to email
router.post("/employee/verifyotp", adminController.verifyOTP); // verifies OTP and redirects


// Logout single session
router.get("/logout", adminController.logoutadmin);

// Logout all devices
router.get("/logout-all", adminController.logoutalladmin);

module.exports = router;

