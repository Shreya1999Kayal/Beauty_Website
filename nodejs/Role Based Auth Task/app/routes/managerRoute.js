
const express=require('express');
const managerController = require('../controllers/managerController.js');
const managermiddleware = require("../middlewares/managermiddleware.js");
;
const router=express.Router();



router.get('/managerlogin/view',managerController.login)
router.post('/managerlogin/create',managerController.logincreate)

router.get('/listmanager',managermiddleware,managerController.managerCheck,managerController.listmanager)
router.get('/addmanager',managermiddleware, managerController.addmanager)
router.post('/storemanager',managermiddleware, managerController.storemanager)

router.get('/geteditmanager/:id',managermiddleware, managerController.geteditmanager)
router.post('/editmanager/:id',managermiddleware, managerController.editmanager)

router.get('/viewmanager/:id',managermiddleware, managerController.viewmanager)

router.get('/logoutmanager',managermiddleware,managerController.logoutmanager)


module.exports=router

