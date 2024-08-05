"use client";
import { customerDataType } from "@/types/definitions";
import { useStore } from "@/lib/store"; // Ensure correct path to store file
import Card from "@/components/ui/Card";
import { Grid } from "@mui/material";
import CustomersForm from "../form/CustomersForm";

export default function Customers() {
  const customers = useStore((state) => state.customers);
  const deleteCustomer = useStore((state) => state.deleteCustomer);

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
      {customers.map((customer: customerDataType) => {
        return (
          <Grid item lg={6} key={customer.id}>
            <Card
              onDelete={() => deleteCustomer(customer.id)}
              title={customer.name}
              subtitle={"customer"}
              type="customers"
              id={customer.id}
              EditForm={<CustomersForm type="edit" customer={customer} />}
            ></Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
