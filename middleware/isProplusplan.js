


const isProplusplan =  async(req, res, next) => 
    {
 if (req.user !== "proplus"){
        return res.status(403).json({
            success:false,
            message:"Unauthorized! proplus"
        })
    }

    next()}

module.exports = isProplusplan
