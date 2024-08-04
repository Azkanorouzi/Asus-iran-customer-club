import LogoutButton from "@/components/LogoutButton";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LogoutButton />
    </>
  );
}
