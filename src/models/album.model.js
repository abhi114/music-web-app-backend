import mongoose from "mongoose";

export const albumSchema = new mongoose.Schema({
    title:{type:String,required:true},
    artist:{type:String,required:true},
    imageUrl:{type:String,required:true},
    releaseYear:{type:Number,required:true},
    songs:[{type:mongoose.Schema.Types.ObjectId,ref:'Song'}], //array of object ids referencing the Song model
},
{timeStamps:true})

export const Album = mongoose.model("Album",albumSchema);