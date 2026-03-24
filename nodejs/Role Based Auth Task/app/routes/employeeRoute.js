const express=require('express');
const EmployeeController = require('../controllers/employeeController.js');
const EmployeeCheck = require("../middlewares/employeemiddleware.js");
;
const router=express.Router();

router.get('/employeelogin/view',EmployeeController.login)
router.post('/employeelogin/create',EmployeeController.logincreate)

router.get('/listemployee',EmployeeCheck,EmployeeController.employeeCheck,EmployeeController.listemployee)
router.get('/addemployee', EmployeeController.addemployee)
router.post('/storeemployee', EmployeeController.storeemployee)

router.get('/viewemployee/:id', EmployeeController.viewemployee)

router.get('/logoutemployee',EmployeeCheck,EmployeeController.logoutemployee)


module.exports=router