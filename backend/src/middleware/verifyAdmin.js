const verifyAdmin = (req,res,next)=>{
    if(req.role!='admin'){
       return res.status(404).send({message:"You are not authorize to perform this action"});
    }
    next();
}