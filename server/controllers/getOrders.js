import OrderModel from "../models/order.js";

const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getOrders(req, res) {
  const email = req.params.email;
  try {
    const orders = await OrderModel.find({ email });
    setTimeout(() => {
      if (orders) {
        return res.status(200).json(orders);
      } else {
        return res.status(404).json({ message: "No orders found" });
      }
    }, randomDelay(200, 500));
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders" });
  }
}

export async function addOrder(req, res) {
  const { email, productsIds, totalPrice, orderDate } = req.body;

  try {
    await wait(randomDelay(200, 500));

    OrderModel.create({
      email,
      status: "Pending",
      productsIds,
      totalPrice,
      orderDate,
    });

    return res.status(200).json({ message: "Added order" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding order" });
  }
}
