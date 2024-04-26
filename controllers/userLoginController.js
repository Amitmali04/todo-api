const UserModal = require("../models/userSchema");
const JWT = require('jsonwebtoken')
const {hashPassword, comparePassword}  = require("../helpers/authHelper");

const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }

    const exisitingUser = await UserModal.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new UserModal({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};


// Login Controller
const loginController = async (req , res) =>{
    try {
        const {email, password} = req.body;
if(!email || !password){
    return res.status(404).send({
        success: false,
        message:"Invalid Email Or Password"
    })
}


const user = await UserModal.findOne({email});
if(!user){
    return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
}

const match = await comparePassword(password , user.password)
if(!match){
    return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
}

const token = await JWT.sign({_id:user._id}, process.env.AUTH_JWT_SECRET, {expiresIn: "7d"
})

res.status(200).send({
    success: true,
    message: "login successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    token,
})
        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    }); 
    }

}

module.exports = {
  createUser,
  loginController
};
