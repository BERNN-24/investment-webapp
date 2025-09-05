import { Router } from "express";
import { authMiddleware, checkAdmin } from "../middleware/authMiddleware.js";
import {dashboardController ,  updateRequestController , setAvatarController, setUsernameController} from "../controllers/userController.js";
import upload from "../middleware/fileStorageMiddleware.js";

const router = Router();

router.get("/dashboard",authMiddleware , checkAdmin("user") , dashboardController);
router.post("/avatar", authMiddleware , checkAdmin("user") , upload.single('image') , setAvatarController);
router.post("/addBalance",authMiddleware , checkAdmin("user") , updateRequestController);
router.post("/withdrawBalance", authMiddleware , checkAdmin("user") ,updateRequestController);
router.post("/setUsername", authMiddleware, checkAdmin("user"), setUsernameController);
export default router;