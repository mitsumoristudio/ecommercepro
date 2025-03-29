
import asyncHandler from "../middleware/asyncHandler.js";
import UserModel from "../modals/UsersModel.js";
import jwt from "jsonwebtoken";
import {generateToken} from "../config/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email: email});

    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_TOKEN, {
            expiresIn: '30d'
        });

        // Set JWT as HTTP-Only Cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24* 60 * 60 * 1000 // 30days in miliseconds
        });

        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
   // res.send(`auth user`);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await UserModel.findOne({email: email})

    if (userExists) {
        res.status(400).json({message: `User already exists`})
    }

    const user = await UserModel.create({
        name: name,
        email: email,
        password: password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data')
    }

//    res.send(`register users`);
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {httpOnly: true, expires: new Date(0)})
    // used to clear the cookie

    res.status(200).json({message: 'Logged out successfully'})
   // res.send(`logout users`);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('User not found');
    }
   // res.send(`get user profile`)
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
  //  res.send(`update user profile`);
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find({});
    res.status(200).json(users);
   // res.send("get all users");
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
    res.send(`delete user`);
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id).select("-password");

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
   // res.send(`get user with id ${req.params.id}`)
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
    res.send('Update User')
});



