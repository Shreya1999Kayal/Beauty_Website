const jwt = require("jsonwebtoken")

const EmployeeAuthCheck = (req, res, next) => {
    if (req.cookies && req.cookies.employeetoken) {
        jwt.verify(req.cookies.employeetoken, process.env.JWT_SECRET_KEY || 'secret', (err, data) => {
            if (err) {
                    console.log("Invalid Token");
                    return res.redirect("/employee/employeelogin/view"); 
            }
            req.employee = data
            console.log('employee : ',req.employee);
            next()
        })
    } else {
        console.log("No Token Found");
        return res.redirect("/employee/employeelogin/view");
    }
}

module.exports = EmployeeAuthCheck;