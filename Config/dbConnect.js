import mongoose from "mongoose";


const connectDb=async()=>{
    try {
        const connectdb =await mongoose.connect("mongodb+srv://at282844:9Fk5b5bbdnUvaU5b@cluster0.zoecuga.mongodb.net/e-commerce_store?retryWrites=true&w=majority")
        // console.log(`Connected to mongo db Successfully ${connectdb.connection.host}`.bgGreen);
    } catch (error) {
        // console.log(`Connection Error = ${error}`.bgRed.white);
    }
}

export default connectDb;