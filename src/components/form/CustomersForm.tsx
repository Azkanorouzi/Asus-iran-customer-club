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
import { customerDataType, statusType } from "@/types/definitions";

export default function CustomersForm({
  customer = {
    id: "",
    name: "",
    age: 0,
    transactions: [],
    status: "happy",
  },
  type,
}: {
  customer?: customerDataType;
  type: "edit" | "add";
}) {
  const transactions = useStore((state) => state.transactions);
  const [customerData, setCustomerData] = useState(customer);
  const editCustomer = useStore((state) => state.editCustomer);
  const addCustomer = useStore((state) => state.addCustomer);

  const handleEdit = () => {
    editCustomer(customerData.id, customerData);
  };
  const handleAdd = () => {
    addCustomer(customerData);
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
        id="name"
        name="name"
        label="customer name"
        type="text"
        fullWidth
        variant="standard"
        value={customerData.name}
        onChange={(e) =>
          setCustomerData({ ...customerData, name: e.target.value })
        }
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="age"
        name="age"
        label="customer age"
        type="number"
        fullWidth
        variant="standard"
        value={customerData.age}
        onChange={(e) =>
          setCustomerData({ ...customerData, age: +e.target.value })
        }
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={customerData.status}
          label="Status"
          onChange={(e) => {
            const status: statusType = e.target.value as statusType;
            return setCustomerData({ ...customerData, status });
          }}
        >
          <MenuItem value={"happy"}>happy</MenuItem>
          <MenuItem value={"neutral"}>neutral</MenuItem>
          <MenuItem value={"sad"}>sad</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel shrink htmlFor="select-multiple-native">
          Transaction
        </InputLabel>
        <Select<string[]>
          multiple
          native
          value={customerData.transactions}
          // @ts-ignore Typings are not considering `native`
          onChange={(e) => {
            setCustomerData({
              ...customerData,
              transactions:
                typeof e.target.value === "string"
                  ? [e.target.value]
                  : e.target.value,
            });
          }}
          label="Native"
          inputProps={{
            id: "select-multiple-native",
          }}
        >
          {transactions.map((transaction) => (
            <option key={transaction.id} value={transaction.id}>
              {transaction.id}
            </option>
          ))}
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
