import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/Users.js";
import verifyToken from "../src/context/VerifyToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, ".env") });
// console.log(process.env);

const app=express();
const PORT=process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI:", process.env.MONGO_URI);
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file!");
    process.exit(1); // Stop the server if URI is missing
  }

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// const Users=[];

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

let flashcards = [
    { id: 1, category: "Spanish", question: "Hello", answer: "Hola" },
    { id: 2, category: "Spanish", question: "Thank you", answer: "Gracias" },
    { id: 3, category: "Science", question: "What is H2O?", answer: "Water" },
    { id: 4, category: "Math", question: "2 + 2?", answer: "4" },
  ];

app.post("/signup", async(req,res)=>{ 
    try{
        const {username,email,password}=req.body;
        console.log(req.body);
        
        //check existing user
        const existingUser=await User.findOne({email});
        if (existingUser) return res.status(400).json({error: "User Already Exists!"});

        //pass hash karna
        const salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(password,salt);

        //new user bnana
        const newUser=new User({username, email, password:hashedPass});
        
        await newUser.save();
        // Users.push(newUser);
        res.status(201).json({ message: "User registered successfully!" });
    }catch(e){
        res.status(500).json({message:"Error occurred",e});
    }
})
  
app.post("/login",async (req,res)=>{
    try{
        const { email, password } = req.body;
        console.log("Password received:", password);
        console.log("Email:", email);

        //check user
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({error: "User not found !"});

        //compare pass
        const isMatch=await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({error:"Invalid Password !"});

        //generate jwt token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        
        res.json({token, user:{id:user._id, username:user.username, email:user.email}});
    }catch(err){
        console.log("error",err);
        res.status(500).json({message: "Error occurred",err});
    }

})

app.get("/user",verifyToken,async (req,res)=>{
    // try{
    //     const user=await User.findById(req.user.id);
    //     if(!user) return res.status(500).json({error:"User not found"});
    //     console.log(user);
    //     res.json({username:user.username, email:user.email})
    // }catch(error){
    //     return res.status(500).json({error:"Server error"})
    // }
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);

})

app.get("/flashcards",(req,res)=>{
    res.json(flashcards);
})

app.get("/flashcards/random",(req,res)=>{
    const randomIndex=Math.floor(Math.random()*flashcards.length);
    res.json(flashcards[randomIndex]);
})

app.get("/flashcards/category/:category",(req,res)=>{
    const category=req.params.category.toLowerCase();
    const filteredCards=flashcards.filter((card)=>card.category.toLowerCase()===category);
    res.json(filteredCards.length?filteredCards:{message:"No cards found."});
});

app.post("/flashcards",(req,res)=>{
    const{category,question,answer}=req.body;
    console.log(req.body);
    
    if(!category || !question || !answer){
        return res.status(400).json({error:"All fields are required."})
    }
    
    const newCard={
        id:flashcards.length+1,
        category,
        question,
        answer
    }
    
    flashcards.push(newCard);
    res.status(201).json(newCard);
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});