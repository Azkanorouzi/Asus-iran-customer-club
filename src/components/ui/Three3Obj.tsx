"use client";
import { Box } from "@mui/material";
import Spline from "@splinetool/react-spline";
import { usePathname } from "next/navigation";
import React from "react";

export default function Three3Obj() {
  const path = usePathname();
  const isHidden =
    path.includes("/customers") || path.includes("/transactions");
  return (
    <Box
      sx={{
        marginTop: { lg: "150px" },
        marginRight: "150px",
        display: isHidden ? "none" : "",
        position: "absolute",
        "@media (max-width: 1000px)": {
          display: "none",
        },
      }}
    >
      <Spline scene="https://prod.spline.design/8eyOhur75-CwIpt9/scene.splinecode" />
    </Box>
  );
}
