const blogModel = require("../model/bolgModel")


const getblog = async (req, res)=>{
    try {
       const blog = await blogModel.create(req.body) 
       if(!blog){
        return res.status(400).json({
            sucess: false,
            message: "blog is not correct"
        })
       }


       res.status(201).json({
        sucess: true,
            message: "blog get sucessfuly"
       })
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    getblog
}