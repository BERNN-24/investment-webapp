import {ErrorHandling} from "../middleware/errorHandMiddleware.js";
import {dashboardModel, updateUserRequestModel , setAvatarModel , setUsernameModel} from "../models/userModels.js";

export async function dashBoardServices(id){
    try{
        const [user , pendingData, transactionData , walletData] = await dashboardModel(id);
        
        if(!user.user_balance || !user.display_name)throw ErrorHandling("Sender wallet details not found", 404);
        if (!Array.isArray(pendingData) || !Array.isArray(transactionData)) throw ErrorHandling("Unable to sync database", 500);
        const response = {
            username : user.display_name,
            walletBalance : user.user_balance,
            walletAddress : walletData,
            subscriptionPlan : user.subscription_plan,
            pendingTransaction : pendingData,
            transactionHistory : transactionData,
        }
        return response;
    } catch(err){
        throw err; 
    }
}

export async function updateRequestServices (value){
    try{
        const {id, amount ,txnType , withdrawalAddress , planName} = value;
        
        let data = [
            id,
            amount,
            txnType,
            txnType == "withdraw"? withdrawalAddress : null,
            txnType == "subscription" ? planName : null
        ]
        const {rows:result} = await updateUserRequestModel(data);
        if (result.length == 0) throw ErrorHandling("Unable to initiate transaction, connection error", 500);
        return result;
    }catch(error) {
        throw error;
    }
}

// SETTING BOTH AVATAR AND USERNAME
export async function setUsernameServices(value) {
    try{
       
        const response =await setUsernameModel(value);

        if (response.length == 0) throw ErrorHandling("Unable to set custom username", 500);
        
        const [result] = response;

        return result;

    } catch(error){
        throw error;
    }
}

export async function setAvatarServices (value){
    try {
            const avatarResult = await setAvatarModel(value); 
              if (avatarResult.length == 0) throw ErrorHandling("Unable to set Avatar Image", 500);
              const [result] = avatarResult;
              return result;
    } catch (error) {
        throw error;
    }
}

