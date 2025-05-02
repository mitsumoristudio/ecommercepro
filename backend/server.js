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
import helmet from "helmet";

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

// Security Headers with Helmet
app.use(helmet());

// Prior to adding to production on Render
// app.get(`/`, (req, res) => {
//     res.send(`API is currently running...`)
// })

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

// payPal
app.get("/api/config/paypal", (req, res) =>
    res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

// set upload folder as static
const __dirname = path.resolve(); // SET _dirname to current directory
app.use(`/uploads`, express.static(path.join(__dirname, `../uploads`))); // changed the pathname because the root folder would not accept /uploads

// Prepare for production
if (process.env.NODE_ENV  === "production") {
    // set static folder
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    // Any route that is not api will be redirected to index.html
    // Handle client-side routing
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is currently running ...")
    })
}

// Error Handler
app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));