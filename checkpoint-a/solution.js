import { findAllOrders, findOrderById } from "./orders-db.js";

// 1. Load all orders from the database
export async function loadOrders() {
  return await findAllOrders();
}

// 2. Return orders from Alexandria with paid status
export function myOrders(orders) {
  return orders.filter(
    (order) => order.city === "Alexandria" && order.status === "paid"
  );
}

// 3. Calculate total revenue
export function summarize(orders) {
  return orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );
}

// 4. Describe an order or handle a missing order
export async function describeOrder(id) {
  try {
    const order = await findOrderById(id);
    return `${order.student}: ${order.item} x${order.quantity}`;
  } catch {
    return `No order with id ${id}`;
  }
}

// 5. Keep only item and quantity, then convert to JSON
export function toJsonLines(orders) {
  return JSON.stringify(
    orders.map((order) => ({
      item: order.item,
      quantity: order.quantity,
    }))
  );
}
