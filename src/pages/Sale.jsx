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

const Sale = () => {
  const { createOrder, fetchOrders, saleOrders } = useTransaction();
  const { products, fetchProducts } = useProductContext();
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    cost_price: "",
    sell_price: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders("sell");
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
      sell_price: selectedProduct[0].sell_price,
    }));
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    createOrder({ ...formData, type: "sell" });
  };

  const calculateTotalProfit = (saleOrders) => {
    const totalProfit = saleOrders.reduce((acc, ele) => {
      const profit = (ele.sell_price - ele.cost_price) * ele.quantity;
      return acc + profit;
    }, 0);
    return totalProfit;
  };

  return (
    <PageWrapper heading="Sale">
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
          id="sell_price"
          name="sell_price"
          label="Sell Price"
          value={formData.sell_price}
          onChange={handleOnChange}
          required
        />
        <PrimaryButton type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </PrimaryButton>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Total Sale Profit:{"  "}
        <span className="money-received">
          ₹{calculateTotalProfit(saleOrders)}
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
                    <th>Sell Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Total Profit</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {saleOrders.map((saleOrder, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <td className="table-row">{saleOrder.product.name}</td>
                      <td className="table-row">{saleOrder.cost_price}</td>
                      <td className="table-row">{saleOrder.sell_price}</td>
                      <td className="table-row">{saleOrder.quantity}</td>
                      <td className="table-row">
                        {saleOrder.quantity * saleOrder.sell_price}
                      </td>
                      <td className="table-row money-received">
                        + ₹
                        {saleOrder.quantity *
                          (saleOrder.sell_price - saleOrder.cost_price)}
                      </td>
                      <td className="table-row">
                        {Date(saleOrder.createdAt).split("GMT")[0]}
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

export default Sale;
