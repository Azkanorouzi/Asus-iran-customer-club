import { Paid } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <section>
      <Typography variant="h1" component={"h1"}>
        <Paid />
        Transactions
      </Typography>
    </section>
  );
}
