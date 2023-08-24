import Booking from '../models/Booking.js';

export const createBooking = async(req, res)=>{

    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();

        res.status(200).json({
            success:true,
            message:"Booking Done Successfully",
            data:savedBooking
        })
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"Booking Failed, Try Again Later",
    }) 
    }
}

//get single Booking
export const getBooking = async(req, res)=>{
    const id=req.params.id;

    try {
        const book = await Booking.findById(id);

        res.status(200).json({
            success:true,
            message:"Bookings Fetched Successfully",
            data:book
        });
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"No Booking Found",
        })   
    }
}

//get all Booking
export const getAllBooking = async(req, res)=>{

    try {
        const books = await Booking.find();

        res.status(200).json({
            success:true,
            message:"Bookings Fetched Successfully",
            data:books
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })   
    }
}