import Customers from "@/components/dashboard/Customers";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export default function Page() {
  return (
    <>
      <Box width={"100vw"} maxWidth={"950px"}>
        {" "}
        <Box component={"section"}>
          <Typography variant="h2" component="h1">
            Customers
          </Typography>
        </Box>
      </Box>
      <Customers />
    </>
  );
}
