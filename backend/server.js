
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from "./config/mongoosedb.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// TODO Connect to MongooseDB
 connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(`/`, (req, res) => {
    res.send(`API is running...`)
})

app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));