
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mockproducts from '../backend/mockdata/mockproducts.js'
import connectToDB from "./config/mongoosedb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// TODO Connect to MongooseDB
 connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Getting Multiple Product from URL
app.get("/api/products", (req, res) => {
    res.json(mockproducts);
})

// Getting Single Product from URL
app.get("/api/products/:id", (req, res) => {
    const product = mockproducts.find((p) => p._id === req.params.id);
    res.json(product);
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));