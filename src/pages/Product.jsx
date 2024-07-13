import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useProductContext } from "../context/ProductContext";

const Product = () => {
  const { addProduct, fetchProducts, products, loading, error } =
    useProductContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost_price: "",
    sell_price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addProduct(formData);
    setFormData({
      name: "",
      description: "",
      cost_price: "",
      sell_price: "",
    });
  };

  return (
    <PageWrapper heading="Product">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          type="text"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Product Name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleOnChange}
        />
        <TextField
          type="text"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          rows={5}
          value={formData.description}
          onChange={handleOnChange}
        />
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          name="cost_price"
          label="Cost Price"
          id="cost_price"
          value={formData.cost_price}
          onChange={handleOnChange}
        />
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          name="sell_price"
          label="Sell Price"
          id="sell_price"
          value={formData.sell_price}
          onChange={handleOnChange}
        />

        <PrimaryButton type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </PrimaryButton>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid #ccc",
                      textAlign: "left",
                    }}
                  >
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Cost Price</th>
                    <th>Sell Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <td className="table-row">{product.name}</td>
                      <td className="table-row">{product.description}</td>
                      <td className="table-row">{product.cost_price}</td>
                      <td className="table-row">{product.sell_price}</td>
                      <td className="table-row">
                        {product?.stock?.quantity ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageWrapper>
  );
};

export default Product;
