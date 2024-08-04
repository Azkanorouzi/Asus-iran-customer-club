import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";

export default function DontHaveAnAccount() {
  return (
    <Box marginLeft={"22px"}>
      <Typography variant="h6" component={"h1"}>
        Don't have an account?
      </Typography>
      <Button LinkComponent={Link} href={`/auth/signup`}>
        Sign up
      </Button>
    </Box>
  );
}
