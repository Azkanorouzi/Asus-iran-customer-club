"use client";
import { useStore } from "@/lib/store";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
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
          id: {targetTransaction.id}
        </Typography>

        <Link href={`/customers/${targetTransaction.id}`}>
          <Typography variant="h6" component="h2">
            By {targetTransaction.by}
          </Typography>
        </Link>
      </Box>
      <Typography variant="h3" component="h3">
        + {targetTransaction.profit}
      </Typography>
      <Typography variant="h5" component="h4">
        Number of bought items: {targetTransaction.numberOfBoughtItems}
      </Typography>
    </Box>
  );
}
