
import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    getUserById,
    updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(getAllUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile);
router.route("/profile").put(updateUserProfile);

router.route("/:id").delete(deleteUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUser);


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