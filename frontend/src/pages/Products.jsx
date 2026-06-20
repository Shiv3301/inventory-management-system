import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity_in_stock: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
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

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        name: formData.name,
        sku: formData.sku,
        price: parseFloat(formData.price),
        quantity_in_stock: parseInt(formData.quantity_in_stock)
      });

      setFormData({
        name: "",
        sku: "",
        price: "",
        quantity_in_stock: ""
      });

      fetchProducts();

    }catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(
    error.response?.data?.detail || "Error adding product"
  );
}
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div>

      <h2 className="mb-4">Products</h2>

      <form onSubmit={addProduct} className="mb-5">

        <input
          className="form-control mb-2"
          placeholder="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="SKU"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Quantity"
          name="quantity_in_stock"
          value={formData.quantity_in_stock}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Add Product
        </button>

      </form>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>{product.quantity_in_stock}</td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.id)}
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

export default Products;