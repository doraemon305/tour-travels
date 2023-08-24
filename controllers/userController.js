
import User from '../models/User.js';

//new User
export const createUser= async (req, res)=>{
    const newUser= new User(req.body);
    try {
        const savedUser= await newUser.save();

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "User Created Succesfully", 
                data: savedUser
            });
    } catch (error) {
        res
        .status(500)
        .json(
            {
                success: false, 
                message: "User Creation Failed. Please Try Again!!!", 
            });
    }
};

export const updateUser = async(req, res)=>{

    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body},
            {new:true})

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "User Updated Succesfully", 
                data: updatedUser
            });
    } catch (error) {
        res
        .status(500)
        .json(
            {
                success: false, 
                message: "User Update Failed", 
            });
    }
};

export const deleteUser = async(req, res)=>{
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "User Deleted Succesfully", 
            });
    } catch (error) {
        res
        .status(500)
        .json(
            {
                success: false, 
                message: "Failed to Delete", 
            });
    }
}

export const getSingleUser = async(req, res)=>{
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "User Record Found",
                data:user 
            });
    } catch (error) {
        res
        .status(404)
        .json(
            {
                success: false, 
                message: "No such User record exists", 
            });
    }
}

export const getAllUser = async(req, res)=>{


    try {
        const users= await User.find({});

        res
        .status(200)
        .json({
            success:true,
            message:"Successful",
            data:users
        });
    } catch (error) {
        res
        .status(404)
        .json(
            {
                success: false, 
                message: "No User records exists", 
            });
    }
}