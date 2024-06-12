import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        mongoose.connect('mongodb+srv://Johan:vF6O0oOgmKaGFGNd@cluster0.e5kohrt.mongodb.net/?retryWrites=true&w=majority');
        console.log(">>>> DB conectada")
    } catch (error){
            console.log(error); 
    }
};
