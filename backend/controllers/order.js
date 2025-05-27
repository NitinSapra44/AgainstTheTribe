import mongoose from "mongoose";
import orderSchema from "../models/order.js";
import productSchema from "../models/product.js";

const Order = mongoose.model("order", orderSchema);
const Product = mongoose.model("product", productSchema);

// Place a new order
async function placeOrder(req, res) {
  try {
    const {
      user,
      cartItems,
      shippingInfo,
      paymentMethod,
      itemsPrice,
      totalQuantity,
    } = req.body;

    if (!user || !cartItems || !shippingInfo || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Update product stock for each item
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name}` });
      }

      const sizeVariant = product.sizes.find((s) => s.size === item.size);
      if (!sizeVariant || sizeVariant.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.name} (size: ${item.size})`,
        });
      }

      sizeVariant.quantity -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user,
      cartItems,
      shippingInfo,
      paymentMethod,
      itemsPrice,
      totalQuantity,
      isPaid: paymentMethod !== "cod",
      orderStatus: "Processing",
      placedAt: new Date(),
    });

    await order.save();

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order Placement Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get all orders for a specific user
async function getUserOrders(req, res) {
  try {
    const { id } = req.params;
    const userOrders = await Order.find({ user: id });
    return res.status(200).json(userOrders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
}

// Get single order summary
async function orderSummary(req, res) {
  try {
    const { id } = req.body;
    const order = await Order.findById(id);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch order summary" });
  }
}

// Cancel an order and restore stock
async function cancelOrder(req, res) {
  const { id } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    for (const item of order.cartItems) {
      await Product.updateOne(
        { _id: item.productId, "sizes.size": item.size },
        { $inc: { "sizes.$.quantity": item.quantity } }
      );
    }

    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({ message: "Order cancelled and stock restored" });
  } catch (err) {
    return res.status(500).json({ message: "Server error while cancelling order" });
  }
}

// Get all orders
async function getAllOrders(req, res) {
  try {
    const allOrders = await Order.find();
    return res.status(200).json(allOrders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch all orders" });
  }
}

// Change order status
async function changeOrderStatus(req, res) {
  try {
    const { id, status } = req.body;
    await Order.findByIdAndUpdate(id, { $set: { orderStatus: status } });
    return res.status(200).json({ message: "Order status updated" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update status" });
  }
}

// Get total orders and revenue
async function allOrders(req, res) {
  try {
    const allOrders = await Order.find();
    const totalOrders = allOrders.length;

    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$itemsPrice" },
        },
      },
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;

    return res.status(200).json({ totalOrders, totalRevenue });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch order stats" });
  }
}

// Get top 5 best-selling products
async function bestProducts(req, res) {
  try {
    const mostSellingProducts = await Order.aggregate([
      { $unwind: "$cartItems" },
      {
        $group: {
          _id: "$cartItems.productId",
          totalSold: { $sum: "$cartItems.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          productId: "$_id",
          name: "$product.name",
          category: "$product.category",
          gender: "$product.gender",
          price: "$product.price",
          photos: "$product.photos",
          totalSold: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json(mostSellingProducts);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch best-selling products" });
  }
}

export {
  placeOrder,
  getUserOrders,
  orderSummary,
  cancelOrder,
  getAllOrders,
  changeOrderStatus,
  allOrders,
  bestProducts,
};
