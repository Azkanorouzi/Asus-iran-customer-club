"use client";

import { signOut } from "next-auth/react";
import { AddCircle, Logout, LogoutOutlined, Paid } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "./CustomDialog";
import { usePathname, useRouter } from "next/navigation";
import CustomersForm from "../form/CustomersForm";
import TransactionForm from "../form/TransactionForm";

export const BottomBar = () => {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const isCustomers = pathname.startsWith("/customers");
  const router = useRouter();
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        position: "fixed",
        bottom: 0,
        borderRadius: "40px",
        mb: "20px",
        ml: "25px",
      }}
    >
      <CustomDialog
        message={`Add a new ${isCustomers ? "customer" : "transaction"}`}
        Trigger={<BottomNavigationAction label="Add" icon={<AddCircle />} />}
        btnAgreeTxt="Ok"
        btnDisagreeTxt="Cancel"
      >
        {isCustomers ? (
          <CustomersForm type="add" />
        ) : (
          <TransactionForm type="add" />
        )}
      </CustomDialog>

      <BottomNavigationAction
        label="Transactions"
        icon={<Paid />}
        onClick={() => router.replace("/transactions")}
      />
      <CustomDialog
        message="Are you sure you want to logout?"
        Trigger={
          <BottomNavigationAction label="Logout" icon={<LogoutOutlined />} />
        }
        btnAgreeTxt="Ok"
        btnDisagreeTxt="Cancel"
        onSubmit={() => signOut()}
      />
    </BottomNavigation>
  );
};
