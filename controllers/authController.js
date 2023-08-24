import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//userRegistration
export const register = async(req, res)=>{

     const salt= bcrypt.genSaltSync(10);
     const hash= bcrypt.hashSync(req.body.password, salt);

    try {
       const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hash, 
            photo: req.body.photo
       });

       await newUser.save();

       res
       .status(200)
       .json({
            success:true,
            message:"Created Successfully!!!"
       });

    } catch (error) {
          console.log(error);
        res
       .status(500)
       .json({
            success:false,
            message:"Failed to Create. Please try Again!!!"
       });
    }
}

//userLogin
export const login = async(req, res)=>{
     const email = req.body.email;

    try {
        const user = await User.findOne({email});

        if(!user)
        {
          return res.status(404).json({
               success:false,
               message:"User does not exists"
          })
        }


        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if(!checkPassword)
        {
          return res.status(401).json({
               success:false,
               message:"Incorrect User Mail or Password"
          })
        }
        const {password, role, ...rest} = user._doc;

        //create jwt token
        const token = jwt.sign(
               {id:user._id, role:user.role}, 
               process.env.JWT_SECRET_KEY, 
               { expiresIn:"15d"}
          );

          //set token in browser cookies and sent the response to client

          res.cookie('accessToken', token, {
               httpOnly:true,
               expires:token.expiresIn
          }).status(200)
          .json({
               token,
               data:{...rest},
               role,
          })

    } catch (error) {
     res.status(500).json({
          success:false,
          message:"Failed to Login"
     }) 
    }
}