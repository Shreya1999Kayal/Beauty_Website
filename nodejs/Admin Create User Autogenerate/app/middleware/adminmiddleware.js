const jwt = require("jsonwebtoken");
const Session = require("../models/Session");

const adminauthCheck = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            req.flash("error", "Please login first");
            return res.redirect("/admin/adminlogin/view");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "secret");

        // Check role
        if (decoded.role !== "admin") {
            req.flash("error", "Access denied");
            return res.redirect("/admin/adminlogin/view");
        }

        // Check session
        if (!decoded.sessionId) {
            req.flash("error", "Invalid session");
            return res.redirect("/admin/adminlogin/view");
        }

        const session = await Session.findById(decoded.sessionId);
        if (!session || session.revoked) {
            req.flash("error", "Session expired. Please login again.");
            return res.redirect("/admin/adminlogin/view");
        }

        req.user = decoded; // attach admin info
        next();

    } catch (err) {
        console.log("Admin Check Error:", err.message);
        req.flash("error", "Invalid token. Please login again.");
        return res.redirect("/admin/adminlogin/view");
    }
};

module.exports = adminauthCheck;