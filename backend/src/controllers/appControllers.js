import {registerService} from "../services/appServices.js";


export async function userRegister (req,res){
//    WORK ON MY RETURN CODE FROM SQL.
const {email,password} = req.body;
    try{
        const response  = await registerService(email,password);
        const [user] = response;
        console.log(user);
        // && response.id
        if(typeof response == "object"){
            req.login(user,(err)=>{
                 return  res.status(200).json({message:"Sucessful", user: user});
                 }) 
        }
    } catch (error){
        // status either 500 or 401
        res.json({message: error.message}).status(error.status)
    }
};

