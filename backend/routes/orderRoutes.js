
import express from 'express';
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, protectAddOrderItems} from "../controllers/orderController.js";
import {admin, protectRoutes} from "../middleware/authMiddleware.js";

export const orderRoutes = express.Router();

orderRoutes.route("/").get(protectRoutes, admin, getOrders);
orderRoutes.route("/").post(protectRoutes, addOrderItems)
//orderRoutes.route("/").post(protectRoutes, protectAddOrderItems);


orderRoutes.route("/myOrders").get(protectRoutes, getMyOrders);
orderRoutes.route("/:id").get(protectRoutes, getOrderById);
orderRoutes.route("/:id/pay").put(protectRoutes, updateOrderToPaid);
orderRoutes.route("/:id/deliver").put(protectRoutes, admin, updateOrderToDelivered);