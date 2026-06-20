import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchCustomers = async () => {
  try {
    const response = await API.get("/customers");
    console.log("Customers:", response.data);
    setCustomers(response.data);
  } catch (error) {
    console.log("Customers Error:", error);
  }
};

const fetchProducts = async () => {
  try {
    const response = await API.get("/products");
    console.log("Products:", response.data);
    setProducts(response.data);
  } catch (error) {
    console.log("Products Error:", error);
  }
};

const fetchOrders = async () => {
  try {
    const response = await API.get("/orders");
    console.log("Orders:", response.data);
    setOrders(response.data);
  } catch (error) {
    console.log("Orders Error:", error);
  }
};

  const createOrder = async (e) => {

    e.preventDefault();

    try {

      await API.post("/orders", {
        customer_id: Number(customerId),
        items: [
          {
            product_id: Number(productId),
            quantity: Number(quantity)
          }
        ]
      });

      alert("Order created successfully");

      fetchOrders();

    } catch (error) {

      alert(
        error.response?.data?.detail || "Error creating order"
      );

    }

  };

  return (
    <div>

      <h2 className="mb-4">Orders</h2>

      <form onSubmit={createOrder} className="mb-5">

        <select
          className="form-control mb-2"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.full_name}
            </option>
          ))}

        </select>

        <select
          className="form-control mb-2"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}

        </select>

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button className="btn btn-primary">
          Create Order
        </button>

      </form>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.total_amount}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Orders;