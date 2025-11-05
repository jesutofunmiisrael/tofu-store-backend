const handleDupError = (err) =>{
    const dupKey = Object.keys(err.keyvalue)[0]
    const dupvalue = Object.values(err.keyvalue)[0]

    return{statusCode:400, message: `${dupKey} of  ${dupvalue} already exists`}
}


const handleValError = (err) =>{
  
}



const errorHandeler = (err, req, res, next) =>{
if (err.code === 1000){
    const error = handleDupError(err)
    res.status(error.statusCode).json({
        success:false,
        message:error.message
    })

} else if (err.name === "ValidationError") {
        const error = handleValError(err)
        res.status(400).json({
            success: false,
            message: "It's a validation error"
        })
    } else{
    res.status(500).json({
        success:false,
        message: "something went wrong",
        path:err.path,
         error: err.messaege
    })
}
}
module.exports = errorHandeler