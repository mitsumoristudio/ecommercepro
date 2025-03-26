
import asyncHandler from "../middleware/asyncHandler.js";
import OrderModel from "../modals/OrdersModels.js";
import ProductModel from "../modals/ProductModels.js";
import {calcPrices} from "../utils/calcPrices.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new OrderModel({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

export const protectAddOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod} = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items found");
    } else {
        // Get the ordered items from ProductsModel
        const itemsFromDB = await ProductModel.find({
            _id: { $in: orderItems.map((x) => x._id)},
        });
        // Map over the order items and use the price from MongoDB
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id)
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            }
        });
        // Calculate Prices
        const {itemsPrice, taxPrice, shippingPrice, totalPrice} =
        calcPrices(dbOrderItems);

        const order = new OrderModel({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({user: req.user._id});
  res.status(200).json(orders);

   // res.send("Get Logged in User Orders");
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// Its not stored in userCollection
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id).populate("user", "name email");

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404)
        throw new Error('User not found');
    }



  //  res.send("Get Order by ID");
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("update Order to Paid");
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order was not found");
    }

   // res.send("Update Order to Delivered");
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find({}).populate("user", "id name");
    res.status(200).json(orders);
//    res.send("Get All Orders");
})


