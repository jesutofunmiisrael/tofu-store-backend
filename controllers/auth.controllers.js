const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const generateString = require("../utils/randomString");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendwelcomeEmaill = require("../mailntemplate/welcomeEmail");
dotenv.config();
const blacklistedTokenModel  = require ("../model/blaclListedToken")
const sendEmail = require("../mailntemplate/sendEmail")
const crypto = require("crypto")
// import crypto from "crypto";


const signup = async (req, res) => {
  const { password, name, email } = req.body;
  // const user = await userModel.create(req.body)
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateString(8);

    const verificationExp = Date.now() + 1000 * 60 * 20;

    const user = await userModel.create({
      ...req.body,
      password: hasedPassword,
      verificationToken,
      verificationExp,
    
    });

    // const userInfo = {
    //   userName: user.name,
    //   email: user.email,
      
    // };
    if (!user) {
      return res.status(400).json({
        success: false,
        messsage: "signup unsucessful",
        // userInfo,
      });
    }
 const sendmail =  sendwelcomeEmaill(name,email)
     
    res.status(201).json({
      success: true,
      message: "Signup successful",
      sendmail,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};




// const login = async (req, res) => {
//   const { password, email } = req.body;

//   try {
//     const verifyUser = await userModel
//       .findOne({ email: email })
//       .select("+password");

//     if (!verifyUser) {
//       return res.status(400).json({
//         Message: "Email Incorrect",
//         Status: "Error",
//       });
//     }

//     const checkPassword = await bcrypt.compare(password, verifyUser.password);

//     if (!checkPassword) {
//       return res.status(402).json({
//         Message: "Passord incorrecr",
//       });
//     }

//     // const generateToken = await jwt.sign(
//     //   {
//     //     userId: verifyUser._id,
//     //     email: verifyUser.email,
//     //   },
//       // process.env.jwtToken,
//       // { expiresIn: "30d" }
//     // );
//     return res.status(201).json({
//       checkPassword,
//       verifyUser,
//       generateToken
//     });

//     // return res.status(202).json({
//     //   verifyUser
//     // })
//   } catch (error) {
//     console.log(error);
//   }
// };




const login = async (req, res ) =>{
  const {email, password} = req.body

  try {
    const user = await userModel.findOne({ email }).select("+password")

     if (!user){
      return res.status(404).json({
          success:false,
          message:"Email or password incorrect"
      })

       
     }

      const iscorrect = await bcrypt.compare(password, user.password)

      if (!iscorrect){
        return res.status(403).json({
           success: false,
                message: "Email or password is incorrect"
        })
      }


      const token = jwt.sign({email, id:user._id}, process.env.jwt_secret, {
        expiresIn:process.env.jwt_exp


      })

    res.status(200).json({
      success:true,
      token
    })
    
  } catch (error) {
    console.log(error);
    
  }
}




const logout = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
        await blacklistedTokenModel.create({ token })
        res.status(200).json({
            success: true,
            message: "logout successfully!",
            token
        })
    } catch (error) {
        console.log(error)

    }
}




const verificationUser = async (req, res)=>{
  const {token} = req.params

  try {
    const user = await userModel.findOne({verificationToken:token})


    if(!user){
      return res.status(404).json({
        success:false,
        message:"Token is invalid or has been verified"
      })
    }

    if (Date.now ()> user.verificationExp){

      return res.status (400).json({
        success:false, 
        message:"Token has expired"
      })
    }


    user.verificationToken = null
    user.verificationExp = null
    user.isVerified = true 
    await user.save()

    res.status(200).json({
      success:true,
      message:"Account verified successfull"
    })

  } catch (error) {
    console.log(error);
    
    
  }
}


const forgetpassword = async (req, res ) => {
  const {email} = req.body



  try {

    const user = await userModel.findOne({email})

       if (!user){
      return res.status(404).json({
        success:false,
        message:"this email does not exist"
      })
    }



  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(otp);
  
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");


      user.resetPasswordToken = hashedOtp;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 10; 
    await user.save();

 

const sendmail = sendEmail(user.name,user.email, otp)
   res.status(200).json({
      success: true,
      message: `OTP sent to email`,
      sendmail
    });
  






 

  } catch (error) {
    console.log(error);
   

}
}





// const resetPassword = async (req, res) => {
//   const {email, otp, newPassword } = req.body;

//   try {
//     const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

//     const user = await userModel.findOne({
//       resetPasswordToken: hashedOtp,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired OTP",
//       });
//     }

//     user.password = password; 
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Password reset successful.",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error resetting password",
//     });
//   }
// };





const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!otp || !newPassword || !email) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields (email, otp, or newPassword)",
    });
  }

  try {
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await userModel.findOne({
      email,
      resetPasswordToken: hashedOtp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
        
      });

     
    }
    
   const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);


    user.password = hashedPassword
     user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error resetting password",
    });
  }




};


module.exports = { signup, login, verificationUser, logout, forgetpassword, resetPassword };
