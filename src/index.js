import express from 'express';
import dotenv from 'dotenv';
import {clerkMiddleware} from '@clerk/express';
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
app.use(express.json()); // to parse JSON bodies
app.use(clerkMiddleware()) //this will add the auth to req object => req.auth.userId this will give us the userId of the logged in user
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