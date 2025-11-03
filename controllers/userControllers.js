// const getuserProfile = (req, res) => {
//     res.status(200).json({
//         success:true,
//         messsage :"Profile verified !......."
//     })
// }

const userModel = require("../model/userModel");


// const updateuser = () =>{
//     res.status(200).json({
//         success:true,
//         messsage:"update sucessfuly ...."
//     })
// }



const getAllusers = async(req, res) =>{
    try {
        const users = await userModel.find()
        if(!users){
            return res.status(404).json({
                success:false,
                message:"unable to feach users"
            })
        }

        res.status(200).json({
            success:true,
            message:"users feached succesfully",
            users

        })
    } catch (error) {
      console.log(error);
        
    }
}

const getUserByid = async (req, res) => {
    const {id} = req.params
try {
    const user = await userModel.findById(id)
      if(!user){
            return res.status(404).json({
                success:false,
                message:"unable to feach users"
            })
        }

        res.status(200).json({
            success:true,
            message:"users feached succesfully"

        })
} catch (error) {
    console.log(error);
    
}
    
}



const getUserQuery = async (req, res) =>{
    const {email} = req.body
    try {
       const user = await userModel.findone ({email, isverified:true})
       
         if(!user){
            return res.status(404).json({
                success:false,
                message:"unable to feach users"
            })
        }

        res.status(200).json({
            success:true,
            message:"users feached succesfully"

        })
    } catch (error) {
        console.log(error);
        
    }
}




module.exports ={
    // getuserProfile,
    // updateuser,
    getAllusers,
    getUserByid,
    getUserQuery
}