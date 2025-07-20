import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{type:String,required:true},//Clerk user Id
    receiverId:{type:String,required:true}, // clerk user id
    content:{type:String,required:true}, // message Content


},{timestamps:true}) // created at and updated at are added automatically
export const Messsage= mongoose.model("Message",messageSchema);
