import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader) return res.status(401).json({error:"No token."});

    const token=authHeader.split(" ")[1];
    // console.log(token);
    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.status(403).json({error:"Inavlid token"});
    }
}

export default verifyToken;