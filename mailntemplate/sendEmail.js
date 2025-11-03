const transporter = require("../config/nodemailer")



// const sendEmail = (name, email, otp) =>{
//     transporter.sendMail({
//         to:email,
//         from:process.env.APP_EMAIL,
//         subject:`otp ${name}`,
//         html:`<div style=" padding: 1rem;">
//         <h2>Hello, ${name}</h2>

        
//         <p>Your password reset OTP is: ${otp}
//       It will expire in 10 minutes.
//       If you didn’t request this, please ignore.
// </p>
//       </div>  
//         `
//     }, (err, info) =>{
// if (err) {
//     console.log(err);
    
// }else{
// console.log(`Otp sent to ${email}`);

 
// }
//     })

   


// }


const sendEmail = async (name, email, otp) => {
  try {
    if (!email) {
      console.error("❌ No recipient email provided!");
      return;
    }

    const info = await transporter.sendMail({
      from: process.env.APP_EMAIL, // must be a valid email
      to: email,
      subject: `Your OTP, ${name}`,
      html: `
        <div style="padding: 1rem;">
          <h2>Hello, ${name}</h2>
          <p>Your password reset OTP is: <b>${otp}</b></p>
          <p>It will expire in 10 minutes.</p>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log(`✅ OTP sent successfully to ${email}`);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};



module.exports = sendEmail



