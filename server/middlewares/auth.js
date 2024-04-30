const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

require("dotenv").config();

exports.auth = async(req, res, next) =>{
    try{
        const token = req.cookies.token 
        || req.body.token ||
         req.header("Authorization").replace("Bearer", "");

         if(!token){
            return res.status(404).json({
                success:false,
                messagge:"Token is Missing"
            })
         };

         try{

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
         }catch(error){
            console.log(error)
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
         };
         next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong when valaditing the token",
        })
    }
};

exports.isStudent= async(req, res, next) =>{
    try{
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for students only"
            })
        }
        next();
    }
   
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
};

// isInstructor
exports.isInstructor= async(req, res, next) =>{
    try{
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only"
            })
        }
        next();
    }
   
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
};

//isAdmin
exports.isAdmin= async(req, res, next) =>{
    try{
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only"
            })
        }
        next();
    }
   
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
};