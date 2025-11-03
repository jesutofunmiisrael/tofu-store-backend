const isBasicPlan = async(req, res, next) =>
   
{
     if (req.user.plan !== "basic"){
        return res.status(403).json({
            success:false,
            message:"Unauthorized! basic"
        })
    }

    next()

}
module.exports = isBasicPlan
