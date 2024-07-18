const User = require('../modals/userModal')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !password || !email){
        return res.status(400).json({err : "Please Fill All the Fields"})
    }
    const userExits = await User.findOne({email});

    if(userExits){
        return res.status(400).json({err : "User Already Exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create User
    const user = await User.create({
        name,email,password : hashedPassword
    })

     if(user){
        return res.status(201).json({
            id:user._id,name:user.name,email:user.email,status:"user created"
        })
     }
     else {
        return res.status(400).json({msg : "Invalid User Data"})
     }
    res.status(200).json("register user")
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        return res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
            status : "Login Successful"
        })
    }
    else {
        return res.status(404).json({msg : "Invalid User Data"})
    }
  
}

const getMe = async (req,res) => {
    const {_id,email,name} = await User.findById(req.user.id);

    return res.status(200).json({_id,name,email})
}

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : '20d'
    });
}


module.exports = {
    registerUser,loginUser,getMe
}