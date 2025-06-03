import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/user/dashboard",authMiddleware, (req,res)=>{
    res.status(200).json({message:"You are authorized", "user": req.user})
})

export default router;