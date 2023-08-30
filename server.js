import express from "express";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./Config/dbConnect.js";
import authRoutes from "./Routes/authRoutes.js";
import categoryRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import cors from'cors'
import path, { join } from 'path'
import { fileURLToPath } from "url";

//Configure env
dotenv.config();

//Db call
connectDb();

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//Rest ooject
const app = express();

//Middlewaress
//Using cors
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path,join(__dirname,'./client/build')))

//Routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

// Rest API
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on the port=${PORT}`.brightYellow.bgBrightRed);
});
