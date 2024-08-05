"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useStore } from "@/lib/store"; // Ensure correct path to store file
import { transactionDataType } from "@/types/definitions";

export default function TransactionForm({
  transaction = {
    id: "",
    by: "",
    profit: 0,
    numberOfBoughtItems: 0,
  },
  type,
}: {
  transaction?: transactionDataType;
  type: "edit" | "add";
}) {
  const customers = useStore((state) => state.customers);
  const [transactionData, setTransactionData] = useState(transaction);
  const editTransaction = useStore((state) => state.editTransaction);
  const addTransaction = useStore((state) => state.addTransaction);

  const handleEdit = () => {
    editTransaction(transactionData.id, transactionData);
  };
  const handleAdd = () => {
    addTransaction({ ...transactionData, id: `T${Math.random()}` });
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "350px",
      }}
    >
      <TextField
        autoFocus
        required
        margin="dense"
        id="profit"
        name="profit"
        label="profit"
        type="number"
        fullWidth
        variant="standard"
        value={transactionData.profit}
        onChange={(e) =>
          setTransactionData({ ...transactionData, profit: +e.target.value })
        }
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="items"
        name="items"
        label="Number of items"
        type="number"
        fullWidth
        variant="standard"
        value={transactionData.numberOfBoughtItems}
        onChange={(e) =>
          setTransactionData({
            ...transactionData,
            numberOfBoughtItems: +e.target.value,
          })
        }
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Customer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={transactionData.by}
          label="By customer: "
          onChange={(e) => {
            return setTransactionData({
              ...transactionData,
              by: e.target.value,
            });
          }}
        >
          {customers.map((customer) => {
            return <MenuItem value={customer.id}>{customer.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Button
        type="submit"
        color={type === "edit" ? "warning" : "success"}
        onClick={(e) => {
          e.preventDefault();
          type === "edit" ? handleEdit() : handleAdd();
        }}
      >
        {type === "edit" ? "Edit" : "Add"}
      </Button>
    </form>
  );
}
