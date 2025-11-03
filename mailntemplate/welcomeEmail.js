const transporter = require("../config/nodemailer")


const sendwelcomeEmaill = (name, email) =>{
    transporter.sendMail({
       to : email,
        from: "Jesutofunmi", 
         subject: `Welcome ${name}`,
         html:`<div style=" padding: 1rem;">
        <h2>Hello, ${name}</h2>

        <p>Welcome to this GIVEAWAY. YOU JUST won $90,000</p>

        <a href="http://localhost:5173/product"
            style="background: black; width: fit-content; color: white; display: block; padding: .5rem 1rem; border-radius: 8px; border: none; text-decoration: none;">clink to continue</a>
    </div>`
    }, (err, info) => {
          if (err) {
            console.log(err)
        } else {
            // consoole.log(info.)
            console.log(`Email sent to ${email}`)
        }
    })
}

module.exports = sendwelcomeEmaill