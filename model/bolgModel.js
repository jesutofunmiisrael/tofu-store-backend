const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
 title:{
    type: String,
    required:true
 },

content:{
    type:String ,
    required:true
},


author:{
type:String,
require:true
}


})

const blogModel = mongoose.model("blog", userSchema)

module.exports = blogModel