
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    }, {
        timestamps: true,
    })

userSchema.methods.matchPassword =  async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export const UserModel = mongoose.model('User', userSchema);

export default UserModel;