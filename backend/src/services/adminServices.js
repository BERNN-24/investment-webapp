import {getBalanceModel , editUserBalanceModel , getRequestsModel , editUserRequestsModel , 
    getUserTransactionModel , deleteUserTransactionModel ,
     restrictAccessModel , editWalletModel} from "../models/adminModels.js";
import { ErrorHandling } from "../middleware/errorHandMiddleware.js";

export async function getBalanceServices() {
    try{
        const {rows : result} = await getBalanceModel();
        if(!result) throw ErrorHandling('Unable to load content', 500);
        return result;
    }catch(error){
        throw error;
    }
}

export async function editUserBalanceServices(userBalance){
    const {action , userId , amount, editedAmount} = userBalance;
    try{
        let result;
        let newBalance;
        switch (action) { 
                
            case "add":
                newBalance = amount + editedAmount;
                result = await editUserBalanceModel (userId, newBalance);
                if(!result) throw ErrorHandling('Unable to add balance', 500);
                break;
            case "remove":
                newBalance = amount - editedAmount;
                if (newBalance <=0) throw Error("Balance too low", 400);
                result = await editUserBalanceModel (userId, newBalance);
                if(!result) throw ErrorHandling('Unable to remove balance', 500);
                break;
            case "reset":
                newBalance = 0;
                result = await editUserBalanceModel (userId , newBalance);
                if(!result) throw ErrorHandling('Unable to reset balance', 500);
                break;
            default:
                ErrorHandling('Invalid action', 400);
                break;
        }

        return  {message: `${action} Balance  successfully`, balance: result.user_balance};
    } catch (error) {
        throw error;
    }
}

// ALL REQUESTS SERVICES

export async function getRequestsServices() {
    try{
        const result = await getRequestsModel();
        if(!Array.isArray(result)) throw ErrorHandling('Unable to fetch requests', 500);
        return result;
    } catch(error){
        throw error;
    }
}

export async function editUserRequestsServices(requestStatus) {
    const {status, pend_id } = requestStatus;
    try {
        const result = await editUserRequestsModel(status , pend_id);
        if (!result) throw ErrorHandling('Unable to update request', 500);
        return result;
    } catch (error) {
        throw error;
    }
}


export async function getAllTransactionServices() {
    try {
        const {rows : result} = await getBalanceModel();
        if (!Array.isArray(result)) throw ErrorHandling('Unable to fetch all transactions', 500);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getUserTransactionsServices(userId) {
    try {
        const result = await getUserTransactionModel(userId);
        if (!Array.isArray(result)) throw ErrorHandling('Unable to fetch user transactions', 500);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserTransactionServices(txnId) {
    try {
        const result = await deleteUserTransactionModel(txnId);
        if (result != 1) throw ErrorHandling('Unable to delete transaction', 500);
        return { message: 'Transaction deleted successfully', data: result };
    } catch (error) {
        throw error;
    }
}   

export async function restrictAccessServices(userId , access){
    try{
        let userAccess; 
        if (access) {
            userAccess = false;
        } else {
            userAccess = true;
        }
        
        const result = await restrictAccessModel(userId, userAccess);
        if (result.length == 0) throw ErrorHandling("Unable to complete restriction", 500)
    }catch (error){
        throw error
    }
}

export async function editWalletServices(value) {d
    const {userId, walletAddress} = value;
    try {
        const {rows: result} = editWalletModel(userId, walletAddress);
        if (result.length == 0) throw ErrorHandling("Unable to edit wallet address", 500);
        return result;
    } catch (error) {
        throw error;
    }
}