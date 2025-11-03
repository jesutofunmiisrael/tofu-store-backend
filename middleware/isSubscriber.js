const isSubcriber  = async (req, res, next) =>{
    const issubcribeb = true
   if(!issubcribeb) {
    return res.status (403).json({
        success:false, 
        message:"kindly subscribe"
    })

   
   }
    req.user = {
        name:"james", 
        email:"jame@email.com",
        plan:"free"
    }

    next()
}

module.exports = isSubcriber