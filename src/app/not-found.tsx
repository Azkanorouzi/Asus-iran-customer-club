import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function notFound() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: "500px",
      }}
    >
      <Typography variant="h1" component={"h1"}>
        {" "}
        404
      </Typography>

      <Typography variant="h2" component={"h2"}>
        {" "}
        Not found
      </Typography>
    </Box>
  );
}
