export function authMiddleware (req,res,next){
    // IF REQ IS AUTHENTICATED, IT WILL CHECK IF USER IF PRESENT IN THE REQ.USER
    // AND WILL NEXT IT SO THAT IT IS HANDLED IN ROUTER PART
    if (req.isAuthenticated()) return next();
    res.status(401).json({"message": "Unauthorized"});
}