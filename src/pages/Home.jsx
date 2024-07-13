import React, { useEffect } from "react";
import { useTransaction } from "../context/TransactionContext";
import PageWrapper from "../components/PageWrapper";
import { Box, Grid, Typography } from "@mui/material";

const Home = () => {
  const { fetchOrders, transactions } = useTransaction();
  useEffect(() => {
    fetchOrders();
  }, []);

  const calculateBalance = (transactions) => {
    const netProfitOrLoss = transactions.reduce((acc, transaction) => {
      if (transaction.type === "sell") {
        acc += transaction.sell_price * transaction.quantity;
      } else if (transaction.type === "buy") {
        acc -= transaction.cost_price * transaction.quantity;
      }
      return acc;
    }, 0);

    return netProfitOrLoss;
  };

  const balance = calculateBalance(transactions);

  return (
    <PageWrapper heading="Transactions">
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Balance:{"  "}
        {balance > 0 ? (
          <span className="money-received">
            ₹{calculateBalance(transactions)}
          </span>
        ) : (
          <span className="money-deducted">
            ₹{calculateBalance(transactions)}
          </span>
        )}
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
                    <th>Total amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((saleOrder, index) => (
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
                      <td className={`table-row `}>
                        {saleOrder.type == "sell" ? (
                          <span className="money-received">
                            {" "}
                            + ₹{saleOrder.quantity * saleOrder.sell_price}
                          </span>
                        ) : (
                          <span className="money-deducted">
                            {" "}
                            - ₹{saleOrder.quantity * saleOrder.cost_price}
                          </span>
                        )}
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

export default Home;
