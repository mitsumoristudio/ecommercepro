
import mongoose from 'mongoose';

export default async function connectToDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
}