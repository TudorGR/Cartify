import mongoose from "mongoose";
const { Schema } = mongoose;
const OrderSchema = new Schema({
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ["Delivered", "Cancelled", "Pending"],
    default: "pending",
  },
  productsIds: [
    {
      type: String,
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    require: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
