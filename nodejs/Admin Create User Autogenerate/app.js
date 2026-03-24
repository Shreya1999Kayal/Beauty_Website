require("dotenv").config();

const express = require("express");
const app = express();

const morgan = require("morgan");
const path = require("path");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");


const port = process.env.PORT || 3507;


const dbConnection = require("./app/config/dbconfig.js");
dbConnection();

// ================== MIDDLEWARES ==================

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser(process.env.COOKIE_SECRET || "SecretforCookieParser"));

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "ShreyaTask",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
            httpOnly: true
        }
    })
);

// Flash messages
app.use(flash());

// Logger
app.use(morgan("dev"));

// ================== VIEW ENGINE ==================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================== GLOBAL FLASH ==================
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success");
    res.locals.error_msg = req.flash("error");
    next();
});

// ================== ROUTES ==================
const adminRoute = require("./app/routes/adminRoute.js");
//const employeeRoute = require("./app/routes/employeeRoute.js");


app.use("/admin", adminRoute);
//app.use("/employee", employeeRoute);


app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
);