const roleModel = require("../modules/roleModel.js")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

class managerController {
  
   
    async managerCheck(req, res, next) {
        try {
            if (req.manager) {
                next()
            }
            else {
                res.redirect("/manager/managerlogin/view")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    async login(req, res) {
        try {
            return res.render("manager/managerlogin")

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
                return res.redirect("/manager/managerlogin/view")
            }
            const manager = await roleModel.findOne({ email })
            if (manager && manager.role === "manager" && await bcryptjs.compare(password, manager.password)) {
                const token = jwt.sign({
                    id: manager._id,
                    name: manager.name,
                    email: manager.email,
                    role: manager.role
                }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" })
                if (token) {
                    res.cookie("managertoken", token)
                    return res.redirect("/manager/listmanager")
                }
                else {
                    console.log("Login failed")
                }
            }
            console.log("Login failed")
            return res.redirect("/manager/managerlogin/view")

        }
        catch (err) {
            console.log(err)

        }

    }
    async listmanager(req, res) {
        try {
            const data = await roleModel.find({ role: "manager" })
            return res.render("manager/listmanager", {
                total: data.length,
                data: data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async addmanager(req, res) {
        try {
            return res.render("manager/addmanager", {
            })
        }
        catch (err) {
            console.log(err)
        }

    }
    async storemanager(req, res) {
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
                password: hashedPassword,
                salary,
                role: "manager"
            });
            await data.save();
            res.redirect('/manager/listmanager');
        }
        catch (err) {
            console.log(err)
        }

    }
    async geteditmanager(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.redirect("/manager/listmanager")
            }
            const data = await roleModel.findById(id)
            if (!data) {
                return res.redirect("/manager/listmanager")
            }
            res.render('manager/editmanager', {
                data: data
            })

        }
        catch (err) {
            console.log(err)
        }

    }
    async editmanager(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.redirect('/manager/listmanager')
            }

            const data = await roleModel.findById(id)

            if (!data) {
                return res.redirect('/manager/listmanager')
            }

            const updatedData = {
                name: req.body.name,
                empid: req.body.empid,
                phno: req.body.phno,
                email: req.body.email,
                address: req.body.address,
                dept: req.body.dept,
                salary: req.body.salary
            }
            const newdata = await roleModel.findByIdAndUpdate(id, updatedData, { new: true })
            res.redirect('/manager/listmanager')
        }
        catch (err) {
            console.log(err)

        }

    }
    async viewmanager(req, res) {
        try {
            const data = await roleModel.findById(req.params.id)
            res.render("manager/viewmanager", { data })
        }
        catch (err) {
            console.log(err)

        }

    }
    async logoutmanager(req, res) {
        try {
            res.clearCookie("managertoken");
            return res.redirect("/manager/managerlogin/view");
        }
        catch (err) {
            console.log(err)
        }
    }
}


module.exports = new managerController()