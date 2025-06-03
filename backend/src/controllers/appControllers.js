import {registerService} from "../services/appServices.js";


export async function userRegister (req,res){
   
    try{
        const response  = await registerService(req.body);
        console.log(response);
        // && response.id
        if(typeof response == "object"){
            req.login(response,(err)=>{
                 return  res.status(200).json({message:"Sucessful", user: response});
                 }) 
        }
    } catch (error){
        // status either 500 or 401
        res.json({message: error.message}).status(error.status)
    }
};

