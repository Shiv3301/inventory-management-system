import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h2 className="mb-4">Dashboard</h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Products</h5>
            <h2>{dashboard.total_products}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Customers</h5>
            <h2>{dashboard.total_customers}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Orders</h5>
            <h2>{dashboard.total_orders}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Low Stock Products</h5>
            <h2>{dashboard.low_stock_products}</h2>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;