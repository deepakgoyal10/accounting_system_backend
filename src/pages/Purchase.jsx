import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useProductContext } from "../context/ProductContext";
import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/ui/PrimaryButton";
import { authAxiosInstance } from "../utils/axiosConfig";
import { useTransaction } from "../context/TransactionContext";
import { Grid, Typography } from "@mui/material";

const Purchase = () => {
  const { createOrder, fetchOrders, purchaseOrders } = useTransaction();
  const { products, fetchProducts } = useProductContext();
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    cost_price: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders("buy");
  }, []);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProductSelect = (e) => {
    const selectedProduct = products.filter(
      (item) => item._id == e.target.value
    );
    console.log(selectedProduct);
    setFormData((prev) => ({
      ...prev,
      product: e.target.value,
      cost_price: selectedProduct[0].cost_price,
    }));
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    createOrder({ ...formData, type: "buy" });
  };

  const calculateTotalSpent = (purchaseOrders) => {
    const totalProfit = purchaseOrders.reduce((acc, ele) => {
      const spent = ele.cost_price * ele.quantity;
      return acc + spent;
    }, 0);
    return totalProfit;
  };

  return (
    <PageWrapper heading="Purchase">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          select
          fullWidth
          margin="normal"
          id="product"
          name="product"
          label="Product"
          value={formData.product}
          onChange={handleProductSelect}
          required
        >
          {products.map((product) => (
            <MenuItem key={product._id} value={product._id}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="number"
          fullWidth
          margin="normal"
          id="quantity"
          name="quantity"
          label="Quantity"
          value={formData.quantity}
          onChange={handleOnChange}
          required
        />
        <TextField
          type="number"
          fullWidth
          margin="normal"
          id="cost_price"
          name="cost_price"
          label="Cost Price"
          value={formData.cost_price}
          onChange={handleOnChange}
          required
        />
        <PrimaryButton type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </PrimaryButton>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Total Spent:{"  "}
        <span className="money-deducted">
          ₹{calculateTotalSpent(purchaseOrders)}
        </span>
      </Typography>
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
                    <th>Cost Price</th>
                    <th>Quantity</th>
                    <th>Total Payment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((purchaseOrder, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <td className="table-row">
                        {purchaseOrder.product.name}
                      </td>
                      <td className="table-row ">{purchaseOrder.cost_price}</td>
                      <td className="table-row">{purchaseOrder.quantity}</td>
                      <td className="table-row money-deducted">
                        - ₹{purchaseOrder.quantity * purchaseOrder.cost_price}
                      </td>
                      <td className="table-row">
                        {Date(purchaseOrder.createdAt).split("GMT")[0]}
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

export default Purchase;
