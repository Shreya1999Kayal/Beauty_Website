const jwt = require("jsonwebtoken")

const managerAuthCheck = (req, res, next) => {
    if (req.cookies && req.cookies.managertoken) {
        jwt.verify(req.cookies.managertoken, process.env.JWT_SECRET_KEY || 'secret', (err, data) => {
            if (err) {
                    console.log("Invalid Token");
                    return res.redirect("/manager/managerlogin/view"); 
            }
            req.manager = data
            console.log('manager : ',req.manager);
            next()
        })
    } else {
        console.log("No Token Found");
        return res.redirect("/manager/managerlogin/view");
    }
}

module.exports = managerAuthCheck