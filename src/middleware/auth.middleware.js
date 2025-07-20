import { clerkClient } from "@clerk/express";
// for eg if we want to like a song then for doing so the user must be logged in 
// so this protectRoute middleware will check if the user is logged in or not
// if the user is logged in then it will call next() otherwise it will return a 401 Unauthorized error
export const protectRoute = async(req,res,next)=>{
  // the app.use(clerkMiddleware()) adds this req.auth.userId to the request object
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized - you must be logged in" });
    
  }
  next();
}

export const requireAdmin = async(req,res,next)=>{
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
           return res.status(403).json({ message: "Forbidden - you must be an admin to access this route" });
            
        }
        next();
    } catch (error) {
        console.error("Error checking admin status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}