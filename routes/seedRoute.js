import express from "express";
import Deck from "../models/Deck";
import { worldCapitalsDeck } from "../seed/WorldCapital";

const router=express.Router();

router.post("/seed/world-capital",async(req,res)=>{
    try{
        const deckExists= await Deck.findOne({title:"World Capitals"});
        if(deckExists){
            return res.status(400).json({message:"Decak Already Exists"});
        }

        const newDeck=await Deck.create(worldCapitalsDeck);
        res.status(201).json({messagge:"Deck created.", deck:newDeck})
    }catch(err){
        req.status(500).json({error:"Failde to create.",err})
    }
})

export default router;