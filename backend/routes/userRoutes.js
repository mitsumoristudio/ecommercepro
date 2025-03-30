
import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserDetails,
    updateUser,
} from "../controllers/userController.js";

import {protectRoutes, admin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(protectRoutes, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protectRoutes, getUserProfile);
router.route("/profile").put(protectRoutes, updateUserProfile);

router.route("/:id").delete(protectRoutes, admin, deleteUser);
router.route("/:id").get(protectRoutes, admin, getUserDetails);
router.route("/:id").put(protectRoutes, admin, updateUser);


export default router;

// - GET http://localhost:5000/api/users
// - POST http://localhost:5000/api/users
// - POST http://localhost:5000/api/users/auth
// - POST http://localhost:5000/api/users/logout
// - GET http://localhost:5000/api/users/profile
// - PUT http://localhost:5000/api/users/profile
// - GET http://localhost:5000/api/users/:id
// - PUT http://localhost:5000/api/users/:id
// - DELETE http://localhost:5000/api/users/:id