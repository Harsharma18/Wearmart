const express = require('express');
const router = express.Router();
const Usermodel = require("./user.model");
require("dotenv").config();
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require('../middleware/verifyToken');
 //Register endpoint 
 router.post("/register",async(req ,res)=>{
    const {username,email,password} = req.body;
//    const salt = await bcrypt.genSalt(10);
//    const hashedPassword= await bcrypt.hash(password,salt);
    try{
       const user = new Usermodel({
        username,email,password
        // password:hashedPassword,
       });
       const users = await user.save();
       res.status(200).send(users);
       

    }catch(err){
        console.log(err);
        res.status(500).send({error:err.message});
    }
 })
 //login endpoint 
 router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user  = await Usermodel.findOne({email});
        if(!user){
            return res.status(404).send({message:"User not found"});
        }
        // const isMatch = await bcrypt.compare(password,user.password);
        const isMatch =  await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).send("Invalid Credential");
        }
        //!Generate token
        const token = jwt.sign({userid:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRY});
        res.cookie('tokenname',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
          
        res.status(200).send({message:"login successful",token,user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            profession:user.profession,
            profileImg:user.profileImg,
        }});

    }catch(err){    
        res.status(500).send({message:"Error logged in user"});
    }
 });
 router.get("/profile",(req,res)=>{
    res.send({message:"hello"});
 })
  //logout endpoint 
  router.post("/logout",async(req,res)=>{
    try{
        res.clearCookie('tokenname');
        res.status(200).send({message:"logout successfull"});

    }catch(err){
        res.status(500).send({message:"Error logged out in user"});

    }
  });
  //delete user
  router.delete("/users/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const user =  await Usermodel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
         res.status(200).send({message:"User deleted succesfully"});

    }catch{
        res.status(500).send({message:"Error deleting  user"});

    }
  });
  //get all users
  router.get("/users",async(req,res)=>{
    try{
        const users = await Usermodel.find({},'id username email role').sort({createdAt:-1});
        res.status(200).send(users);
      

    }catch(err){
        res.status(500).send({message:"Error getting all users"});
    }
  });
  //update user role 
   router.put("/users/:id",async(req,res)=>{
    try{
        const {id} = req.params;
         const {role} = req.body;
         const user = await Usermodel.findByIdAndUpdate(id,{role},{new:true});
         if(!user){
            return res.status(404).json({message:"user not found"});
         }
         res.status(200).send({message:"user role updated successfully"});

    }catch(err){
        res.status(404).send({message:"Error updating user role"});

    }
   
   })
   //edit and update profile 
   router.patch("/edit-profile",async(req,res)=>{
    try{
        const {id,username,bio,profession,profileImg} = req.body;
        if(!id){
            return res.status(401).send({message:"User id is required"});
    
        }
        const user = await Usermodel.findById(id);
        if(!user){
            return res.status(401).send({message:"user not found"});
        }
        //update profile
         if(username !== undefined) user.username = username;
         if(profileImg !== undefined) user.profileImg= profileImg;
         if(bio !== undefined) user.bio =  bio;
         if(profession !== undefined) user.profession = profession;
          await user.save();
          res.status(200).send({message:"Profile update succesfully",
            user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            profession:user.profession,
            profileImg:user.profileImg,
          }});

    }catch(err){
        res.status(401).send({message:'Error updating user profile'});
    }
   

   })

module.exports = router;
 