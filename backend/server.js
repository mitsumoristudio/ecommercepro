import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
//import cors from 'cors';
import connectToDB from "./config/mongoosedb.js";
import productRoutes from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import {orderRoutes} from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// TODO Connect to MongooseDB
 connectToDB();

// app.use(cors());

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.get(`/`, (req, res) => {
    res.send(`API is running...`)
})

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

// set upload folder as static
const __dirname = path.resolve(); // SET _dirname to current directory
app.use(`/uploads`, express.static(path.join(__dirname, `../uploads`))); // changed the pathname because the root folder would not accept /uploads

// Error Handler
app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));