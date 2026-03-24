require("dotenv").config()

const express = require("express")
const app = express()


const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash=require("connect-flash")

const port = process.env.PORT || 3507

const dbConnection = require("./app/config/dbConfig.js")
dbConnection()

// Middlewares
app.use(express.static(require("path").join(__dirname,"public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('SecretforCookieParser'))
app.use(session({
    secret:"ShreyaTask",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60* 60* 24
    }
}))
app.use(flash())
app.set("view engine", "ejs")
app.set("views","views")


//Global flash middlewares
app.use((req, res, next)=>{
    res.locals.success_msg=req.flash("success")
    res.locals.error_msg=req.flash("error")
    next()
})

const employeeRoute = require("./app/routes/employeeRoute.js")
app.use("/employee", employeeRoute)
const adminRoute = require("./app/routes/adminRoute.js")
app.use("/admin", adminRoute)
const managerRoute = require("./app/routes/managerRoute.js")
app.use("/manager", managerRoute)


app.listen(port, ()=>console.log("Running successfully on port "+port))

