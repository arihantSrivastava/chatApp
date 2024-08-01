import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI).then(() => {
        console.log('Database connected');
    }).catch((error)=>{
        console.log(error);
    })
};
export default connectDB;