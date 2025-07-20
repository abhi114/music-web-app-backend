import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import {clerkMiddleware} from '@clerk/express';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statsRoutes from './routes/stats.route.js';
import { connectDb } from './lib/db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json()); // to parse JSON bodies
app.use(clerkMiddleware()) //this will add the auth to req object => req.auth.userId this will give us the userId of the logged in user
// this is the directory where the uploaded files will be stored temporarily until they are uploaded to cloudinary
//always put this before the routes so that it can be implemented before the routes are setup
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,'tmp'),
    createParentPath:true, // this will create the parent directory if it does not exist
    limits:{fileSize:10*1024*1024} // this will limit the file size to 10MB
}))
//console.log("Environment Variables:", process.env.PORT);
app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);



app.listen(PORT,()=>{
    console.log("Server is running on port" + PORT);
    connectDb();
})