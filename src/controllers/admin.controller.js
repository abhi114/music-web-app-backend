import cloudinary from "../lib/cloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
const UploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:"auto", // this will automatically detect the resource type (image, video, etc.)
        })
        return result.secure_url; // this will return the secure URL of the uploaded file
    } catch (error) {
        console.log("error in uploading to cloudinary");
        throw new Error("Error uploading file to cloudinary");
    }
}
export const createSong=async (req,res,next) =>{
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({msg:"Please upload all files"})
        }
        const {title,artist,albumId,duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;
        const audioUrl = await UploadToCloudinary(audioFile);
        const imageUrl = await UploadToCloudinary(imageFile);
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId:albumId || null, // if albumId is not provided, it will be null
        })
        await song.save();
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id} // this will add the song id to the album's songs array
            })
            res.status(201).json(song);
        }
    } catch (error) {
        console.error("Error creating song:", error);
        next(error); // Pass the error to the next middleware for centralized error handling
    }
}
//  Even though you don't write _id: { type: ObjectId } 
// in your schema, Mongoose secretly adds it for you, and its 
// findById methods are designed to use that secret ID!
export const deleteSong = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const song = await Song.findById(id);
        //if song belongs to album update the albums song array
        if(song.albumId){
          //This Mongoose method is used to find a single document by its _id and then update it.
          //Find the specific album that this song is a part of.
          //In the songs array of the Album document, find and remove any entry that has the value song._id
          await Album.findByIdAndUpdate(song.albumId, {
            $pull: { songs: song._id },
          });
        }
        await Song.findByIdAndDelete(id);
        req.status(200).json({message:"Song deleted successfully"});
    } catch (error) {
        console.log("error in deleteSong",error);
        next(error);
    }
}
