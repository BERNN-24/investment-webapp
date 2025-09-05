import { Router } from "express";
import { authMiddleware, checkAdmin } from "../middleware/authMiddleware.js";
import {allUsersBalanceController , editUserBalanceController , getAllRequestsController ,
         editAllRequestsController , getAllTransactionsContoroller, getUserTransactionsController,
        deleteUserTransactionController, restrictAccessController , editWalletController , adminRegister } from "../controllers/adminController.js";


const router = Router();

router.get("/dashboard", authMiddleware, checkAdmin('admin'), (req,res)=>{
    res.status(200).json({message: "Admin Authorized", user : req.user})
})

// FOR BALANCE MANAGEMENT
router.get("/usersBalance", authMiddleware, checkAdmin('admin'), allUsersBalanceController);
router.post("/usersBalance", authMiddleware,checkAdmin("admin"),editUserBalanceController);
// FOR REQUESTS MANAGEMENT
router.get("/allRequests", authMiddleware, checkAdmin('admin'), getAllRequestsController);
router.post("/allRequests", authMiddleware, checkAdmin('admin'), editAllRequestsController);
// FOR TRANSACTIOM MANAGEMENT
router.get("/allTransaction", authMiddleware,checkAdmin("admin"), getAllTransactionsContoroller);
router.get("/userTransaction/:userId", authMiddleware, checkAdmin("admin"), getUserTransactionsController)
router.delete("/allTransaction", authMiddleware, checkAdmin("admin"), deleteUserTransactionController);

// ADDITION OF NEW ADMIN
router.post("/addAdmin", authMiddleware,checkAdmin("admin"),adminRegister)
// RESTRICT USER ACCESS MANAGEMENT
router.patch("/restrictAccess", authMiddleware, checkAdmin("admin"), restrictAccessController);
// SETTING WALLET ADDRESS
router.post("/walletAddress", authMiddleware , checkAdmin("admin") , editWalletController);
export default router; 