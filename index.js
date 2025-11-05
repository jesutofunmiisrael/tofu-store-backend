// console.log("hello");
// console.log("hello");
const cors = require ("cors")

const express = require("express")
const app = express()
const connectToDb = require("./config/connectToDb")
require("./config/nodemailer")
app.use(cors())
app.use(express.json()) // allow json data
app.use(express.urlencoded({ extended: true }))

const auth = require("./router/auth")

const product = require("./router/product")
const blog = require("./router/blog")


const dotenv = require("dotenv")
const userRouter = require("./router/userRouter")
const sendwelcomeEmaill = require ("./mailntemplate/welcomeEmail")
const cartRouter = require("./router/cartRouter")
const errorHandeler = require("./middleware/errorHandel")
dotenv.config()

const PORT = process.env.PORT
connectToDb()
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})






// app.post("/product", (reg, res) =>{
    
    
//     res.status(201).json ({
//         sucess:true,
//         messaege : `${req.body.name} has been added successfully !`
//     })
  
// })
  app.use("/api/products", product)
  app.use("/api/auth", auth)
  app.use("/api/blog", blog)
  app.use("/api/users", userRouter)
  app.use("/api/cart", cartRouter)

app.use("/{any}", errorHandeler)

  app.all("/{any}", (req, res)=>{
    res.status(404).json({
      success:false,
      message:`${req.method} ${req.originalUrl} is not an endpoint on this server`
    });
  })
  

// app.get("/products", (req, res) =>{
//     res.json([
//         {name:"nike shoe", price: 700},
//        {name:"nike shoe", price: 700},
//         {name:"nike shoe", price: 700},
//         {name:"nike shoe", price: 700}

//     ])
// })

// app.get("/products/:productId", (req, res) =>{
//     console.log(res.body)
//     // console.log(req.originalUrl)
//     // console.log(req.query)
// })



// app.get("/post", (req, res) =>{
//     res.json([
//         {name:"nike shoe", price: 700},
//        {name:"nike shoe", price: 700},
//         {name:"nike shoe", price: 700},
//         {name:"nike shoe", price: 700}

//     ])
// })

// app.get("/user", (req, res) =>{
//     res.json([
//         {user1:"nike shoe"},
//        {user2:"nike shoe"},
//         {user3:"nike shoe"},
//          {user4:"nike shoe"},

//     ])
// })


// app.get("/cart", (req, res) =>{
//     res.json([
//         {name:"nike shoe", price: 700},
//        {name:"nike shoe", price: 700},
//         {name:"nike shoe", price: 700},
//         {name:"nike shoe", price: 700}

//     ])
// })



// app.get("/cart", (req, res) =>{
//     res.send("welcome")
       
// })
    
// // })
// app.get("/", (req, res) =>{
//     res.send("Welcome to node class Api")
// })







// baseUrl:http://localhost:4005/
//endpointn

