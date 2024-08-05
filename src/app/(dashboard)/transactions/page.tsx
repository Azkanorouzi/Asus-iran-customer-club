import Transactions from "@/components/dashboard/Transactions";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <>
      <Box width={"100vw"} maxWidth={"950px"}>
        {" "}
        <Box component={"section"}>
          <Typography variant="h2" component="h1">
            Transactions
          </Typography>
        </Box>
      </Box>
      <Transactions />
    </>
  );
}
