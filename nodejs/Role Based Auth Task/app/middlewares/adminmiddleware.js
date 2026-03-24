const jwt = require("jsonwebtoken")

const AdminAuthCheck = (req, res, next) => {
    if (req.cookies && req.cookies.admintoken) {
        jwt.verify(req.cookies.admintoken, process.env.JWT_SECRET_KEY || 'secret', (err, data) => {
            if (err) {
                    console.log("Invalid Token");
                    return res.redirect("/admin/adminlogin/view"); 
            }
            req.admin = data
            console.log('admin : ',req.admin);
            next()
        })
    } else {
        console.log("No Token Found");
        return res.redirect("/admin/adminlogin/view");
    }
}

module.exports = AdminAuthCheck;