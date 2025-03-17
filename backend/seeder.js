
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import mockuser from "./mockdata/mockuser.js";
import mockproducts from "./mockdata/mockproducts.js";
import UsersModel from "./modals/UsersModel.js";
import ProductModel from "./modals/ProductModels.js";
import OrdersModels from "./modals/OrdersModels.js";
import connectToDB from './config/mongoosedb.js'

dotenv.config();
// To have access to environmental variable

connectToDB();
// To make queries to the Mongoose Database and connect

export const importData = async () => {
    try {
        await OrdersModels.deleteMany();
        await ProductModel.deleteMany();
        await UsersModel.deleteMany();

        const createdUsers = await UsersModel.insertMany(mockuser); // return the user from mock array

        const adminUser = createdUsers[0]._id;

        const sampleProducts = mockproducts.map((product) => {
            return {...product, user: adminUser}; // use spread operator to add the products
        });

        await ProductModel.insertMany(sampleProducts);
        console.log('Data Imported'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1); // end the process
    }
}

export const destroyData = async () => {
    try {
        await OrdersModels.deleteMany();
        await ProductModel.deleteMany();
        await UsersModel.deleteMany();

        console.log('Data Deleted'.red.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);

    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}