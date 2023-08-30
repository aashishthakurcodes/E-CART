import express from "express";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./Config/dbConnect.js";
import authRoutes from "./Routes/authRoutes.js";
import categoryRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import cors from'cors'
import path, { dirname } from 'path';  // Fixed import statements
import { fileURLToPath } from "url";

//Configure env
dotenv.config();

//Db call
connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  // Changed from path.dirname

//Rest object
const app = express();

//Middlewares
//Using cors
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client', 'build')));  // Fixed path.join

//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

// Rest API
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));  // Fixed path.join
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on the port=${PORT}`.brightYellow.bgBrightRed);
});
