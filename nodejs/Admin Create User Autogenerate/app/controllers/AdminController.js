const roleModel = require("../models/roleModel.js")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const Session = require("../models/Session.js")

class adminController {
    async registration(req, res) {
        try {
            res.render("admin/registration")
        }
        catch (err) {
            console.log(err)

        }
    }
    async registrationstore(req, res) {
        try {
            const { name, email, password, confirmpassword, phno, address, dept, salary } = req.body;

            // Validation
            if (!name || !email || !password || !confirmpassword || !phno || !address || !dept || !salary) {
                req.flash("error", "All fields are required.");
                return res.redirect("/admin/registration");
            }

            if (password !== confirmpassword) {
                req.flash("error", "Passwords do not match.");
                return res.redirect("/admin/registration");
            }

            const existUser = await roleModel.findOne({ email });
            if (existUser) {
                req.flash("error", "User already exists.");
                return res.redirect("/admin/registration");
            }

            // Create user
            const store = await roleModel.create({
                name,
                email,
                password,
                phno,
                address,
                dept,
                salary,
                role: "admin"
            });

            // Tokens
            const refreshToken = jwt.sign(
                { id: store._id, role: store.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "15d" }
            );

            const session = await Session.create({
                user: store._id,
                refreshTokenHash: refreshToken,
                ip: req.ip,
                userAgent: req.headers["user-agent"]
            });

            const accessToken = jwt.sign(
                {
                    id: store._id,
                    role: store.role,
                    sessionId: session._id
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "15m" }
            );

            // ✅ Cookies
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 15 * 24 * 60 * 60 * 1000
            });

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000
            });

            req.flash("success", "You have registered successfully.");
            return res.redirect("/admin/adminlogin/view");

        } catch (err) {
            console.log(err);
            req.flash("error", "Server Error. Please try again.");
            return res.redirect("/admin/registration");
        }
    }
    async adminCheck(req, res, next) {
        try {
            if (!req.user) {
                return res.redirect("/admin/adminlogin/view");
            }

            if (req.user.role !== "admin") {
                return res.status(403).send("Access Denied: Admins only");
            }
            console.log("Cookies:", req.cookies);
            console.log("AccessToken:", req.cookies.accessToken);

            next();
        } catch (err) {
            console.log(err);
            return res.redirect("/admin/adminlogin/view");
        }
    }
    async adminlogin(req, res) {
        try {
            return res.render("admin/adminlogin")
        }
        catch (err) {
            console.log(err)
        }
    }
    async adminlogincreate(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                req.flash("error", "All fields are required.");
                return res.redirect("/admin/adminlogin/view");
            }

            const admin = await roleModel.findOne({ email: email.toLowerCase() });

            if (!admin || admin.role !== "admin") {
                req.flash("error", "Admin not found");
                return res.redirect("/admin/adminlogin/view");
            }

            const isMatch = await bcryptjs.compare(password, admin.password);
            if (!isMatch) {
                req.flash("error", "Invalid password");
                return res.redirect("/admin/adminlogin/view");
            }

            // Create refresh token
            const refreshToken = jwt.sign(
                { id: admin._id, role: admin.role },
                process.env.JWT_SECRET_KEY || "secret",
                { expiresIn: "15d" }
            );

            // Create session
            const session = await Session.create({
                user: admin._id,
                refreshTokenHash: refreshToken,
                ip: req.ip,
                userAgent: req.headers["user-agent"]
            });

            // Create access token
            const accessToken = jwt.sign(
                { id: admin._id, role: admin.role, sessionId: session._id },
                process.env.JWT_SECRET_KEY || "secret",
                { expiresIn: "15m" }
            );

            // Set cookies
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
            });

            // Redirect AFTER cookies are set
            req.flash("success", "Logged in successfully.");
            return res.redirect("/admin/employee/listemployee");

        } catch (err) {
            console.error("Login Error:", err.message);
            req.flash("error", "Server error");
            return res.redirect("/admin/adminlogin/view");
        }
    }
    async listemployee(req, res) {
        try {
            const data = await roleModel.find({ role: "employee" });

            return res.render("admin/listEmployee", {
                total: data.length,
                data: data
            });
        } catch (err) {
            console.log(err);
            req.flash("error", "Failed to fetch employees");
            return res.redirect("/admin/adminlogin/view");
        }
    }
    async addemployee(req, res) {
        try {
            const verifiedEmail = req.session.verifiedEmail || null;
            const email_for_otp = req.session.email_for_otp || null;

            return res.render("admin/addEmployee", {
                user: req.user,           // optional for UI control
                verifiedEmail,            // if email is verified
                email_for_otp             // if OTP sent but not verified yet
            });

        } catch (err) {
            console.log(err);
            req.flash("error", "Unable to load page");
            return res.redirect("/admin/employee/listemployee");
        }
    }
    async storeemployee(req, res) {
        try {
            const { name, empid, phno, password, email, address, dept, salary } = req.body;

            // Admin check
            if (!req.user || req.user.role !== "admin") {
                req.flash("error", "Only admin can add employees");
                return res.redirect("/admin/employee/listemployee");
            }

            // Validation
            if (!name || !phno || !password || !email || !address || !dept || !salary) {
                req.flash("error", "All fields are required");
                return res.redirect("/admin/employee/addemployee");
            }

            // Duplicate email check
            const existUser = await roleModel.findOne({ email });
            if (existUser) {
                req.flash("error", "Email already exists or not verified.");
                return res.redirect("/admin/employee/addemployee");
            }

            // ✅ Create employee
            const data = new roleModel({
                name,
                empid,
                phno,
                email,
                address,
                dept,
                password,
                salary,
                role: "employee"
            });

            await data.save();

            req.flash('success', "Employee created successfully");
            return res.redirect('/admin/employee/listemployee');

        } catch (err) {
            console.log(err);
            req.flash('error', 'Something went wrong while saving employee.');
            return res.redirect('/admin/employee/addemployee');
        }
    }
    async geteditemployee(req, res) {
        try {
            const id = req.params.id;

            // ✅ Admin check
            if (!req.user || req.user.role !== "admin") {
                req.flash("error", "Access denied");
                return res.redirect("/admin/employee/listemployee");
            }

            if (!id) {
                req.flash("error", "Employee ID missing.");
                return res.redirect("/admin/employee/listemployee");
            }

            const data = await roleModel.findById(id);

            // ✅ Check existence + role
            if (!data || data.role !== "employee") {
                req.flash("error", "Employee not found.");
                return res.redirect("/admin/employee/listemployee");
            }

            return res.render("admin/editEmployee", {
                data: data
            });

        } catch (err) {
            console.log(err);
            req.flash("error", "Something went wrong");
            return res.redirect("/admin/employee/listemployee");
        }
    }
    async editemployee(req, res) {
        try {
            const id = req.params.id;

            // Admin check
            if (!req.user || req.user.role !== "admin") {
                req.flash("error", "Access denied");
                return res.redirect("/admin/employee/listemployee");
            }

            if (!id) {
                req.flash("error", "Employee ID missing.");
                return res.redirect("/admin/employee/listemployee");
            }

            const data = await roleModel.findById(id);

            // Check existence + role
            if (!data || data.role !== "employee") {
                req.flash("error", "Employee not found.");
                return res.redirect("/admin/employee/listemployee");
            }

            const { name, empid, phno, email, address, dept, salary } = req.body;

            // Validation
            if (!name || !phno || !email || !address || !dept || !salary) {
                req.flash("error", "All fields are required");
                return res.redirect(`/admin/employee/edit/${id}`);
            }

            // Duplicate email check (excluding current user)
            const existingEmail = await roleModel.findOne({
                email
            });

            if (existingEmail) {
                req.flash("error", "Email already exists");
                return res.redirect(`/admin/employee/edit/${id}`);
            }

            const updatedData = {
                name,
                empid,
                phno,
                email,
                address,
                dept,
                salary
            };

            await roleModel.findByIdAndUpdate(id, updatedData, { new: true });

            req.flash("success", "Employee updated successfully.");
            return res.redirect("/admin/employee/listemployee");

        } catch (err) {
            console.log(err);
            req.flash("error", "Failed to update employee.");
            return res.redirect("/admin/employee/listemployee");
        }
    }
    async viewemployee(req, res) {
        try {
            const id = req.params.id;

            // Admin only
            if (!req.user || req.user.role !== "admin") {
                req.flash("error", "Access denied");
                return res.redirect("/employee/listemployee");
            }

            const data = await roleModel.findById(id);

            // Must be employee
            if (!data || data.role !== "employee") {
                req.flash("error", "Employee not found");
                return res.redirect("/admin/employee/listemployee");
            }

            return res.render("employee/viewemployee", { data });

        } catch (err) {
            console.log(err);
            req.flash("error", "Something went wrong");
            return res.redirect("/admin/employee/listemployee");
        }
    }
    async deleteemployee(req, res) {
        try {
            const id = req.params.id;

            // Admin only
            if (!req.user || req.user.role !== "admin") {
                req.flash("error", "Access denied");
                return res.redirect("/admin/employee/listemployee");
            }

            if (!id) {
                req.flash("error", "Employee ID missing.");
                return res.redirect("/admin/employee/listemployee");
            }

            const data = await roleModel.findById(id);

            // Must exist + must be employee
            if (!data || data.role !== "employee") {
                req.flash("error", "Employee not found.");
                return res.redirect("/admin/employee/listemployee");
            }

            // Delete employee
            await roleModel.findByIdAndDelete(id);

            req.flash("success", "Employee deleted successfully.");
            return res.redirect("/admin/employee/listemployee");

        } catch (err) {
            console.log(err);
            req.flash("error", "Failed to delete employee.");
            return res.redirect("/admin/employee/listemployee");
        }
    }
    async logoutadmin(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                req.flash("error", "No refresh token found");
                return res.redirect("/admin/adminlogin/view");
            }

            // Decode token to get user id
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_SECRET_KEY || "secret"
            );

            // Find sessions of this user only
            const sessions = await Session.find({
                user: decoded.id,
                revoked: false
            });

            let matchedSession = null;

            for (let session of sessions) {
                const isMatch = await session.compareRefreshToken(refreshToken);
                if (isMatch) {
                    matchedSession = session;
                    break;
                }
            }

            if (!matchedSession) {
                req.flash("error", "Invalid session");
                return res.redirect("/admin/adminlogin/view");
            }

            // Revoke session
            matchedSession.revoked = true;
            await matchedSession.save();

            // Clear cookies (FIXED)
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");

            req.flash("success", "Logged out successfully");
            return res.redirect("/admin/adminlogin/view");

        } catch (err) {
            console.log(err);
            req.flash("error", "Logout failed");
            return res.redirect("/admin/adminlogin/view");
        }
    }
    async logoutalladmin(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                req.flash("error", "No refresh token found");
                return res.redirect("/admin/adminlogin/view");
            }

            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_SECRET_KEY || "secret"
            );

            // ✅ Revoke all sessions
            await Session.updateMany(
                { user: decoded.id, revoked: false },
                { revoked: true }
            );

            // Clear cookies
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");

            req.flash("success", "Logged out from all devices");
            return res.redirect("/admin/adminlogin/view");

        } catch (err) {
            console.log(err);
            req.flash("error", "Logout all failed");
            return res.redirect("/admin/adminlogin/view");
        }
    }
    async getme(req, res) {
        try {
            const token = req.cookies.accessToken;

            if (!token) {
                req.flash("error", "Not logged in");
                return res.redirect("/admin/adminlogin/view");
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY || "secret"
            );

            // ✅ Check session
            const session = await Session.findById(decoded.sessionId);

            if (!session || session.revoked) {
                req.flash("error", "Session expired");
                return res.redirect("/admin/adminlogin/view");
            }

            const user = await roleModel.findById(decoded.id);

            if (!user) {
                req.flash("error", "User not found");
                return res.redirect("/admin/adminlogin/view");
            }

            return res.render("profile", { user });

        } catch (err) {
            console.log(err);
            req.flash("error", "Something went wrong");
            return res.redirect("/admin/adminlogin/view");
        }
    }
    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                req.flash("error", "No refresh token");
                return res.redirect("/admin/adminlogin/view");
            }

            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_SECRET_KEY || "secret"
            );

            // ✅ Find sessions for user
            const sessions = await Session.find({
                user: decoded.id,
                revoked: false
            });

            let matchedSession = null;

            for (let session of sessions) {
                const isMatch = await session.compareRefreshToken(refreshToken);
                if (isMatch) {
                    matchedSession = session;
                    break;
                }
            }

            if (!matchedSession) {
                req.flash("error", "Invalid session");
                return res.redirect("/admin/adminlogin/view");
            }

            // ✅ New tokens
            const newAccessToken = jwt.sign(
                {
                    id: decoded.id,
                    role: decoded.role,
                    sessionId: matchedSession._id
                },
                process.env.JWT_SECRET_KEY || "secret",
                { expiresIn: "15m" }
            );

            const newRefreshToken = jwt.sign(
                {
                    id: decoded.id,
                    role: decoded.role
                },
                process.env.JWT_SECRET_KEY || "secret",
                { expiresIn: "15d" }
            );

            // ✅ Update session
            matchedSession.refreshTokenHash = newRefreshToken;
            await matchedSession.save();

            // ✅ Set cookies
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 15 * 24 * 60 * 60 * 1000
            });

            req.flash("success", "Session refreshed");
            return res.redirect("/admin/employee/listemployee");

        } catch (err) {
            console.log(err);
            req.flash("error", "Session expired");
            return res.redirect("/admin/adminlogin/view");
        }
    }
    async sendOTP(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                req.flash("error", "Please enter your email.");
                return res.redirect("/admin/employee/addemployee");
            }

            const user = await roleModel.findOne({ email });
            if (!user) {
                req.flash("error", "Email does not exist.");
                return res.redirect("/admin/employee/addemployee");
            }

            if (user.is_verified) {
                req.flash("success", "Email is already verified.");
                return res.redirect("/admin/employee/addemployee");
            }

            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            // Save OTP
            await OTPModel.create({ userId: user._id, otp });

            // Send OTP via email
            await sendEmail(user.email, otp); // Your function must send email with OTP

            req.flash("success", "OTP sent to your email. Please enter the OTP below.");
            return res.redirect("/admin/employee/addemployee"); // redirect back to form

        } catch (err) {
            console.error(err);
            req.flash("error", "Unable to send OTP. Try again later.");
            return res.redirect("/admin/employee/addemployee");
        }
    }
    async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                req.flash("error", "Email and OTP are required.");
                return res.redirect("/admin/employee/addemployee");
            }

            const user = await roleModel.findOne({ email });
            if (!user) {
                req.flash("error", "Email does not exist.");
                return res.redirect("/admin/employee/addemployee");
            }

            if (user.is_verified) {
                req.flash("success", "Email already verified.");
                return res.redirect("/admin/employee/addemployee");
            }

            const otpDoc = await OTPModel.findOne({ userId: user._id, otp });
            if (!otpDoc) {
                req.flash("error", "Invalid or expired OTP. Please request a new OTP.");
                return res.redirect("/admin/employee/addemployee");
            }

            // Mark user as verified
            user.is_verified = true;
            await user.save();

            // Remove OTPs
            await OTPModel.deleteMany({ userId: user._id });

            req.flash("success", "Email verified successfully!");
            return res.render("admin/addEmployee", {
                verifiedEmail: email
            });

        } catch (err) {
            console.error(err);
            req.flash("error", "Unable to verify OTP. Try again later.");
            return res.redirect("/admin/employee/addemployee");
        }
    }




}



module.exports = new adminController()