import { BottomBar } from "@/components/dashboard/BottomBar";
import LogoutButton from "@/components/LogoutButton";
import { BottomNavigation } from "@mui/material";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BottomBar />
    </>
  );
}
