import mongoose from "mongoose";

const CardSchem = new mongoose.Schema({
    question : String,
    answer : String
});

const DeckSchema= new mongoose.Schema({
    title:{type:String, required:true},
    decription:String,
    category:String,
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"USer"},
    createdAt:{type:Date, default:Date.now}
})

export default mongoose.model("Deck",DeckSchema);