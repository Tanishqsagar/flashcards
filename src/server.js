import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app=express();
const PORT=5000;

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let flashcards = [
    { id: 1, category: "Spanish", question: "Hello", answer: "Hola" },
    { id: 2, category: "Spanish", question: "Thank you", answer: "Gracias" },
    { id: 3, category: "Science", question: "What is H2O?", answer: "Water" },
    { id: 4, category: "Math", question: "2 + 2?", answer: "4" },
  ];

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