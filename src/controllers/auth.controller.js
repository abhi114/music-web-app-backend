import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body; // this is how clerk stores it

    //check user already exists
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      //sign up user
      await User.create({
        clerId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    res
      .status(200)
      .json({ success: true, message: `User signed up successfully` });
  } catch (error) {
    console.log("error in auth callback route:", error);
    res
      .status(500)
      .json({
        success: false,
        message: `Error in auth callback route: ${error.message}`,
      });
  }
};
