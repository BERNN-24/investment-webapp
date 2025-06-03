import express from "express";
import session from "express-session";
import passport from "passport";
import env from "dotenv";
import cors from "cors";
import appRoute from "../src/routes/appRoutes.js";
import protectedRoute from "../src/routes/protectedRoute.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors());
env.config();
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 1000 * 60 * 30
    }   
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/",appRoute);
app.use("/user", appRoute);
app.use("/protected", protectedRoute);

export default app;