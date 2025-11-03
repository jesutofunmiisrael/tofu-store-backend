
const jwt = require("jsonwebtoken");
const User = require("../model/userModel"); 


const SECRET = process.env.JWT_SECRET || "mysecretkey";

const verifyToken = async (req, res) => {
  try {
  
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

 
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = verifyToken;
