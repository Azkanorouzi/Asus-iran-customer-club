"use client";
import { transactionDataType } from "@/types/definitions";
import { useStore } from "@/lib/store"; // Ensure correct path to store file
import Card from "@/components/ui/Card";
import { Grid } from "@mui/material";
import TransactionForm from "../form/TransactionForm";

export default function Transactions() {
  const transactions = useStore((state) => state.transactions);
  const deleteTransaction = useStore((state) => state.deleteTransaction);

  return (
    <Grid
      container
      spacing={2}
      width={"100vw"}
      maxWidth={"950px"}
      sx={{
        paddingRight: "80px",
        position: "relative",
        right: "200px",
        maxHeight: "500px",
        overflowY: "scroll",
      }}
    >
      {transactions.map((transaction: transactionDataType) => {
        return (
          <Grid item lg={6} key={transaction.id}>
            <Card
              onDelete={() => deleteTransaction(transaction.id)}
              title={`+${transaction.profit} By ${transaction.by}`}
              subtitle={"transaction"}
              type="transactions"
              id={transaction.id}
              EditForm={
                <TransactionForm type="edit" transaction={transaction} />
              }
            ></Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
