import passport from "passport";
import { Router } from "express";

import "../Authentication/localAuth.js";
import { userRegister } from "../controllers/appControllers.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = Router ();

router.get("/", (req,res)=>{
    res.json("HELLO");
});
// HANDLE USER REGISTRATION
router.post('/register',userRegister);


router.post('/login', (req,res,next) =>{
    passport.authenticate("local", (err,user,info)=>{
        if(err) return res.json({message : err.message}).status(err.statusCode);
        if(!user) return res.json({message :"Invalid Password"}).status(401);
    req.login(user,(err)=>{
                if (err) return next(err);
                    return res.status(201).json({message :'User Logged in.', user : req.user})           
                });

}) (req,res,next);
});

router.get("/verifyAuth", authMiddleware, (req,res)=>{
     res.status(200).json(req.user);
});

// router.post('/user/bookings',u);

// router.post();

export default router;