const isProplan = async(req, res, next) =>
{
    if (req.user !== "pro"){
          return res.status(403).json({
            success:false,
            message:"Unauthorized! pro"
        })
    }
}

module.exports = isProplan