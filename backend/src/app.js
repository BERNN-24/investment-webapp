import express from "express";
import session from "express-session";
import passport from "passport";
import env from "dotenv";
import cors from "cors";
import appRoute from "../src/routes/appRoutes.js";
import protectedRoute from "../src/routes/userRoute.js";
import admin from "../src/routes/adminRoute.js";
import bodyParser from "body-parser";

//EXPRESS INITIALIZATION 
const app = express();
// CORS CONFIGURATION
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials : true ,
}));
// .ENV CONFIGURATION
env.config();
app.use(bodyParser.urlencoded({extended:true}));
// SESSION CONFIGURATION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 1000* 60 * 5, // 5 minutes
        // sameSite: "strict",
        // secure: false, // Set to true if using HTTPS
        // httpOnly: true, // Helps prevent XSS attacks
    }   
}));
// PASSPORT INITIALIZTION
app.use(passport.initialize());
app.use(passport.session());

// SERVER STORAGE ROM MULTER CONFIGURATION
app.use("/uploads", express.static("uploads"));


// ALL APP ROUTES
app.use("/",appRoute);
app.use("/user", protectedRoute);
app.use("/admin", admin);

export default app;