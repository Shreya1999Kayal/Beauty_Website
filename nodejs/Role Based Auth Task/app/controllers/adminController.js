const roleModel = require("../modules/roleModel.js")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

class adminController {
    async registration(req, res) {
        try {
            res.render("registration")
        }
        catch (err) {
            console.log(err)

        }
    }
    async registrationstore(req, res) {
        try {
            const { name, email, password, confirmpassword, phno, address, dept, salary } = req.body;

            if (!name || !email || !password || !confirmpassword) {
                req.flash("error", "All fields are required.")
                return res.redirect("/admin/registration")
            }

            if (password !== confirmpassword) {
                req.flash("error", "Passwords do not match.")
                return res.redirect("/admin/registration")
            }

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            const store = new roleModel({
                name,
                email,
                password: hashedPassword,
                phno,
                address,
                dept,
                salary,
                role: "admin"
            });

            const token = jwt.sign(
                {
                    id: store._id,
                    email: store.email,
                    role: store.role
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1d" }
            );

            store.token = token;

            await store.save();

            res.cookie("admintoken", token, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            });
            req.flash('success', "You have registered successfully.")
            return res.redirect("/admin/adminlogin/view");

        } catch (err) {
            console.log(err);
            req.flash("error", "Server Error. Please try again.")
            return res.redirect("/admin/registration")
        }
    }
    async adminCheck(req, res, next) {
        try {
            if (req.admin) {
                next()
            }
            else {
                res.redirect("/admin/adminlogin/view")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    async login(req, res) {
        try {
            return res.render("admin/adminlogin")
        }
        catch (err) {
            console.log(err)
        }
    }
    async logincreate(req, res) {
        try {
            const { email, password } = req.body
            if (!(email && password)) {
                req.flash("error", "All fields are required.")
                return res.redirect("/admin/adminlogin/view")
            }
            const admin = await roleModel.findOne({ email })
            if (admin && admin.role === "admin" && await bcryptjs.compare(password, admin.password)) {
                const token = jwt.sign({
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role
                }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" })
                if (token) {
                    res.cookie("admintoken", token)
                     req.flash("success", "Logged in successfully.")
                    return res.redirect("/admin/listadmin")
                }
                else {
                    console.log("Login failed")
                }
            }
            console.log("Login failed")
            req.flash("error", "Login Failed. Try again.")
            return res.redirect("/admin/adminlogin/view")
        }
        catch (err) {
            console.log(err)

        }

    }
    async listadmin(req, res) {
        try {
            const data = await roleModel.find({ role: "admin" })
            return res.render("admin/listadmin", {
                total: data.length,
                data: data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async addadmin(req, res) {
        try {
            return res.render("admin/addadmin", {
            })
        }
        catch (err) {
            console.log(err)
        }

    }
    async storeadmin(req, res) {
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
                role: "admin"
            });
            await data.save();
            req.flash('success', "Admin List is updated.")
            res.redirect('/admin/listadmin');
        }
        catch (err) {
            console.log(err)
            req.flash('error', 'Something went wrong while saving admin.')
            res.redirect('/admin/addadmin')
        }

    }
    async geteditadmin(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                req.flash("error", "Admin not found.")
                return res.redirect("/admin/listadmin")
            }
            const data = await roleModel.findById(id)
            if (!data) {
                req.flash("error", "Admin not found.")
                return res.redirect("/admin/listadmin")
            }
            res.render('admin/editadmin', {
                data: data
            })

        }
        catch (err) {
            console.log(err)
        }

    }
    async editadmin(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                req.flash("error", "Admin not found.")
                return res.redirect('/admin/listadmin')
            }

            const data = await roleModel.findById(id)

            if (!data) {
                req.flash("error", "Admin not found.")
                return res.redirect('/admin/listadmin')
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
            req.flash("success", "Admin is updated successfully.")
            res.redirect('/admin/listadmin')
        }
        catch (err) {
            console.log(err)
            req.flash('error', 'Failed to update admin.')
            res.redirect('/admin/listadmin')

        }

    }
    async viewadmin(req, res) {
        try {
            const data = await roleModel.findById(req.params.id)
            res.render("admin/viewadmin", { data })
        }
        catch (err) {
            console.log(err)

        }

    }

    async deleteadmin(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                req.flash("error", "Admin not found.")
                return res.redirect('/admin/listadmin')
            }
            const data = await roleModel.findById(id)
            if (!data) {
                req.flash("error", "Admin not found.")
                return res.redirect('/admin/listadmin')
            }

            await roleModel.findByIdAndDelete(id)
            req.flash("success", "Admin is deleted successfully.")
            res.redirect('/admin/listadmin')

        }
        catch (err) {
            console.log(err)
        }

    }
    async logoutadmin(req, res) {
        try {
            res.clearCookie("admintoken");
            req.flash("success", "Logged out successfully.")
            return res.redirect("/admin/adminlogin/view");
        }
        catch (err) {
            console.log(err)
        }
    }

}

module.exports = new adminController()