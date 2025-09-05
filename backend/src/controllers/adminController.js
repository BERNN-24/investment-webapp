import {getBalanceServices , editUserBalanceServices , getRequestsServices , editUserRequestsServices ,
     getAllTransactionServices , getUserTransactionsServices ,
      deleteUserTransactionServices, editWalletServices} from "../services/adminServices.js";

      import { registerService } from "../services/appServices.js";
// CONTROLLERS FOR USER BALANCE 
export async function allUsersBalanceController(req,res){
    try{
        const result = await getBalanceServices();
        res.status(200).json({data : result});
    }catch(error){
        res.status(error.statusCode || 500).json({message: error.message || "Unable to access data"});
    }
}


export async function editUserBalanceController (req,res,){
    const userBalance = req.body;
    try{
        const result = await editUserBalanceServices(userBalance);
        res.status(200).json(result);
    } catch(error){
        res.status(error.statusCode || 500).json({message: error.message || "Internal Server Error"});
    }
}

// CONTROLLER FOR ALL REQUESTS
export async function getAllRequestsController(req,res){
    try{
        const result = await getRequestsServices();
        res.status(200).json({message: "All requests fetched successfully", data: result});
    }catch(error){
        res.status(error.statusCode || 500).json({message: error.message || "Internal Server Error"});
    }
}

export async function editAllRequestsController(req,res){
    const requestStatus = req.body;
    console.log(requestStatus);
    try{
        // Assuming you have a service to handle request editing
        const result = await editUserRequestsServices(requestStatus);
        res.status(200).json(result);
    } catch(error){
        res.status(error.statusCode || 500).json({message: error.message || "Internal Server Error"});
    }
}

// CONTROLLER FOR TRANSACTIONS
export async function getAllTransactionsContoroller(req,res){
    try{
        const result = await getAllTransactionServices();
        res.status(200).json({message: "All transactions fetched successfully", data: result});
    } catch(error){
        res.status(error.statusCode || 500).json({message: error.message || "Internal Server Error"});
    }
}

export async function getUserTransactionsController(req, res) {
    const { userId } = req.params;
    try {
        const result = await getUserTransactionsServices(userId);
        res.status(200).json({ message: "User transactions fetched successfully", data: result });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
}

export async function deleteUserTransactionController(req, res) {
    const {txnId } = req.query;
    try {
        // Assuming you have a service to handle transaction deletion
        const result = await deleteUserTransactionServices(txnId);
        res.status(200).json({ message: "Transaction deleted successfully", data: result });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
}
// ACCESS RESTRICTION
export async function restrictAccessController(req,res){
    const {userId, access} = req.body;
    try{
        const result = await restrictAccessServices(userId , access);
        res.status(200).json({message: 'User access modification successful', data : result}) 
    }catch (error){
        res.status(error.statusCode || 500).json({message : error.message || "Internal Server Error"});
    }
}
// WALLET EDITING
export async function editWalletController(req, res) {
    const { userId, walletAddress } = req.body;
    try {
        // Assuming you have a service to handle wallet address editing
        const result = await editWalletServices(userId, walletAddress);
        res.status(200).json({ message: "Wallet address updated successfully", data: result });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
}

// ADD NEW ADMIN

export async function adminRegister(req,res) {
    const {email , password} = req.body;
    try{
        const result = await registerService(email, password , "admin");
        res.status(200).json({message : "New Admin successfully added." , data : result});
    } catch(error){
        res.status(error.statusCode || 500).json({message : error.message || "Internal Error"});
    }
}