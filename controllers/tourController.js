
import Tour from '../models/Tour.js';

//new tour
export const createTour= async (req, res)=>{
    const newTour= new Tour(req.body);
    try {
        const savedTour= await newTour.save();

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "Tour Created Succesfully", 
                data: savedTour
            });
    } catch (error) {
        res
        .status(500)
        .json(
            {
                success: false, 
                message: "Tour Creation Failed. Please Try Again!!!", 
            });
    }
};

export const updateTour = async(req, res)=>{

    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body},
            {new:true})

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "Tour Updated Succesfully", 
                data: updatedTour
            });
    } catch (error) {
        res
        .status(500)
        .json(
            {
                success: false, 
                message: "Tour Update Failed", 
            });
    }
};

export const deleteTour = async(req, res)=>{
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "Tour Deleted Succesfully", 
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

export const getSingleTour = async(req, res)=>{
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate('reviews');

        res
        .status(200)
        .json(
            {
                success: true, 
                message: "Tour Record Found",
                data:tour 
            });
    } catch (error) {
        res
        .status(404)
        .json(
            {
                success: false, 
                message: "No such tour record exists", 
            });
    }
}

export const getAllTour = async(req, res)=>{

    //for pagination

    const page= parseInt(req.query.page);

    try {
        const tours= await Tour.find({})
        .populate('reviews')
        .skip(page * 8)
        .limit(8);

        res
        .status(200)
        .json({
            success:true,
            count: tours.length,
            message:"Successful",
            data:tours
        });
    } catch (error) {
        res
        .status(404)
        .json(
            {
                success: false, 
                message: "No tour records exists", 
            });
    }
}

//get Tour by Search City
export const getTourBySearch= async(req, res)=>{

    const city=new RegExp(req.query.city, 'i');
    const distance=parseInt(req.query.distance);
    const maxGroupSize= parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour
        .find({ 
            city, distance:{$gte: distance}, 
            maxGroupSize:{$gte: maxGroupSize}
        }).populate('reviews');

        res
        .status(200)
        .json({
            success:true,
            message:"Successful",
            data:tours
        });
    } catch (error) {
        res
        .status(404)
        .json(
            {
                success: false, 
                message: "No match found", 
            });
    }
}

//get featured tour
export const getFeaturedTour = async(req, res)=>{

    //for pagination

    try {
        const tours= await Tour.find({featured:true})
        .populate('reviews')
        .limit(8);

        res
        .status(200)
        .json({
            success:true,
            message:"Successful",
            data:tours
        });
    } catch (error) {
        res
        .status(404)
        .json(
            {
                success: false, 
                message: "No tour records exists", 
            });
    }
}

export const getTourCount= async(req, res)=>{
    try {
        const tourCount= await Tour.estimatedDocumentCount();

        res
        .status(200)
        .json({
            success:true,
            data: tourCount
        })
    } catch (error) {
        res
        .status(500)
        .json({
            success:false,
            message: "Failed to Fetch"
        })
    }
}