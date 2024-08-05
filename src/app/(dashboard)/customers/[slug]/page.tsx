import { useStore } from "@/lib/store";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const transactios = useStore((state) => state.transactions);
  const targetTransaction = transactios.filter(
    (transaction) => transaction.id === slug,
  )[0];
  return (
    <Box width={"100vw"} maxWidth={"950px"}>
      {" "}
      <Box component={"section"}>
        <Typography variant="h2" component="h1">
          {targetTransaction.id}
        </Typography>
      </Box>
    </Box>
  );
}
