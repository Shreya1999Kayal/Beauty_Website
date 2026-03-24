const express=require('express');
const adminController = require('../controllers/adminController.js');
const adminmiddleware = require("../middlewares/adminmiddleware.js");
;
const router=express.Router();


router.get("/registration", adminController.registration)
router.post("/registration", adminController.registrationstore)

router.get('/adminlogin/view',adminController.login)
router.post('/adminlogin/create',adminController.logincreate)

router.get('/listadmin',adminmiddleware,adminController.adminCheck,adminController.listadmin)
router.get('/addadmin',adminmiddleware, adminController.addadmin)
router.post('/storeadmin',adminmiddleware, adminController.storeadmin)

router.get('/geteditadmin/:id',adminmiddleware, adminController.geteditadmin)
router.post('/editadmin/:id',adminmiddleware, adminController.editadmin)

router.get('/viewadmin/:id',adminmiddleware, adminController.viewadmin)

router.post('/deleteadmin/:id',adminmiddleware, adminController.deleteadmin)

router.get('/logoutadmin',adminmiddleware,adminController.logoutadmin)


module.exports=router

