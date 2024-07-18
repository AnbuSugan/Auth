const User = require('../modals/userModal')
const jwt = require('jsonwebtoken')


const auth = async(req,res,next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
 
       try{
        token = req.headers.authorization.split(' ')[1];
           
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select('-password');
            next();
       }
        catch(err){
            return res.status(401).json({err :"Not Authorized, Wrong Token"})
        }
        if(!token){
            return res.status(401).json({msg : "Not Authorized, No token"})
        }
    }
}

module.exports = {auth}