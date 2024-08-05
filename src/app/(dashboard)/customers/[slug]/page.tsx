"use client";
import notFound from "@/app/not-found";
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
  const customers = useStore((state) => state.customers);
  const transactions = useStore((state) => state.transactions);
  console.log(slug);
  const customerTarget = customers.filter(
    (customer) => customer.id === slug,
  )[0];

  if (!customerTarget) {
    notFound();
    return;
  }
  return (
    <Box width={"100vw"} maxWidth={"950px"}>
      {" "}
      <Box component={"section"}>
        <Typography variant="h2" component="h1">
          id: {customerTarget.id} name: {customerTarget.name}
        </Typography>
        {transactions
          .filter((transaction) =>
            customerTarget.transactions.includes(transaction.id),
          )
          .map((transaction) => {
            return (
              <Link href={`/transactions/${transaction.id}`}>
                <Typography variant="h6" component="h2">
                  transaction +{transaction.profit} by this user
                </Typography>
              </Link>
            );
          })}
      </Box>
      <Typography variant="h3" component="h3">
        Status: {customerTarget.status}
      </Typography>
      <Typography variant="h5" component="h4">
        age: {customerTarget.age}
      </Typography>
    </Box>
  );
}
