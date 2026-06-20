import { useEffect, useState } from "react";
import API from "../services/api";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addCustomer = async (e) => {

    e.preventDefault();

    try {

      await API.post("/customers", {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone
      });

      setFormData({
        full_name: "",
        email: "",
        phone: ""
      });

      fetchCustomers();

    } catch (error) {

      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      alert(
        error.response?.data?.detail || "Error adding customer"
      );

    }

  };

  const deleteCustomer = async (id) => {

    try {

      await API.delete(`/customers/${id}`);

      fetchCustomers();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail || "Delete failed"
      );

    }

  };

  return (
    <div>

      <h2 className="mb-4">Customers</h2>

      <form onSubmit={addCustomer} className="mb-5">

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          Add Customer
        </button>

      </form>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr key={customer.id}>

              <td>{customer.id}</td>
              <td>{customer.full_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>

              <td>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Customers;