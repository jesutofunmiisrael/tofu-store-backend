const nodemailer = require("nodemailer")
const dotenv = require ("dotenv")
dotenv.config()


const transporter = nodemailer.createTransport({
     host:"smtp.gmail.com",  
     port:587,
     secure:false,
     auth : {
     user:process.env.APP_EMAIL,
     pass:process.env.APP_PASS 

     }                      
})
 


transporter.verify((err, success) =>{
    if(success){
        console.log("Nodemaller is ready to send email");
        
    }else{
        {
            console.log(err);
            
        }
    }
})

module.exports = transporter