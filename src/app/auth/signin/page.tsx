"use client";
import DontHaveAnAccount from "@/components/form/DontHaveAnAccount";
import SignIn from "@/components/form/SignIn";
import { Box } from "@mui/system";
import React from "react";

export default function page() {
  return (
    <Box position={"relative"} right={"230px"}>
      <SignIn />
      <DontHaveAnAccount />
    </Box>
  );
}
