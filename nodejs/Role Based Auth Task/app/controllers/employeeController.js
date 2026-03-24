const roleModel = require("../modules/roleModel.js")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

class EmployeeController {
 
    async employeeCheck(req, res, next) {
        try {
            if (req.employee) {
                next()
            }
            else {
                res.redirect("/employee/employeelogin/view")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    async login(req, res) {
        try {
            return res.render("employeelogin")

        }
        catch (err) {
            console.log(err)
        }

    }
    async logincreate(req, res) {
        try {
            const { email, password } = req.body
            if (!(email && password)) {
                console.log("All input is required")
                return res.redirect("/employee/employeelogin/view")
            }
            const employee = await roleModel.findOne({ email })
            if (employee && employee.role === "employee" && await bcryptjs.compare(password, employee.password)) {
                const token = jwt.sign({
                    id: employee._id,
                    name: employee.name,
                    email: employee.email,
                    role: employee.role
                }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" })
                if (token) {
                    res.cookie("employeetoken", token)
                    return res.redirect("/employee/listemployee")
                }
                else {
                    console.log("Login failed")
                }
            }
            console.log("Login failed")
            return res.redirect("/employee/employeelogin/view")

        }
        catch (err) {
            console.log(err)

        }

    }
    async listemployee(req, res) {
        try {
            const data = await roleModel.find({ role: "employee" })
            return res.render("listemployee", {
                total: data.length,
                data: data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async addemployee(req, res) {
        try {
            return res.render("addemployee", {
            })
        }
        catch (err) {
            console.log(err)
        }

    }
    async storeemployee(req, res) {
        try {
            const { name, empid, phno, password, email, address, dept, salary } = req.body
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            const data = new roleModel({
                name,
                empid,
                phno,
                email,
                address,
                dept,
                password:hashedPassword,
                salary,
                role: "employee"
            });
            await data.save();
            res.redirect('/employee/listemployee');
        }
        catch (err) {
            console.log(err)
        }

    }
     
    async viewemployee(req, res) {
        try {
            const data = await roleModel.findById(req.params.id)
            res.render("viewemployee", { data })
        }
        catch (err) {
            console.log(err)

        }

    }

   
    async logoutemployee(req, res) {
        try {
            res.clearCookie("employeetoken");
            return res.redirect("/employee/employeelogin/view");
        }
        catch (err) {
            console.log(err)
        }
    }

}

module.exports = new EmployeeController()