import {dashBoardServices , updateRequestServices , setAvatarServices , setUsernameServices} from "../services/userServices.js";


export async function dashboardController (req,res) {
    const {id} = req.query;
    try{
        const result = await dashBoardServices(id);
        res.status(200).json({message:"You are authorized", data: result });
    } catch (err){
        res.status(err.statusCode || 500).json({message: err.message || "Internal Server Error"});
    } 
}

export async function updateRequestController (req,res) {
    try{
        const result = await updateRequestServices(req.body);
        res.status(200).json({message:"Success", data : result});
    } catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message: err.message || "Unable to complete Transaction, Try Again"});
    }
}

// SETTING AVATAR
export async function setAvatarController (req,res) {
    const image = req.file;

    const {userId} = req.body;
    // SETTLING FILE URL THAT WILL BE SAVED IN THE DATABASE AND USED TO QUERY THE DISK STORAGE
     const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${image.filename}`;
     console.log(fileUrl);
    try{
        // MAKING SURE AVATAR ARE NOTY EMPTY STRINGS
        if(!image) throw Error("Please fill in all fields", 400);
        // RESPONSE FROM RESULT
        const avatarResult  = await setAvatarServices([fileUrl, userId]);
        res.status(200).json({message: "Avatar updated successfully", data: avatarResult});
    } catch (error) {
        console.log(error).message;
        res.status(error.statusCode || 500).json({message: error.message || "An error occurred while updating avatar"});
    }
    
}

export async function setUsernameController (req,res){
    const {nickName, userId} = req.body;
    try {
        const result = await setUsernameServices([nickName , userId])
        res.status(200).json(result);

    } catch (error) {
        console.group(error.message)
        res.status(error.statusCode || 500).json({message : error.message || "An unexpected error occured."});
    }
}

