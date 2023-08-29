import JWT from "jsonwebtoken"
import userModel from  "../Models/userModel.js"

//Protected Routes token
export const requireSign= async(req,res,next)=>{
    
    try {
        const decode =JWT.verify(req.headers.authorization,process.env.JWT_SECRET);

        req.user=decode
        next() 
     
    } catch (error) {
    //    console.log(error); 
       res.send({
        success:false,
        message:"Token Access error"
       })
    }
}

//JWT verify is used for verifying the token which we get from headers section

//Admin Access
export const isAdmin=async(req,res,next)=>{
    try {
       const user = await userModel.findById(req.user._id)
       if(user.role !== 1){
        return res.status(401).send({
            success:false,
            message:"UnAuthorized Access"
        })
       }
       else{
        next();
       }
    } catch (error) {
        // console.log(error);
        res.send({
            success:false,
            message:"Error in Admin middleware"
           })
    }
}