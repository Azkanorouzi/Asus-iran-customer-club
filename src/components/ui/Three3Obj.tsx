"use client";
import { useSendMessage } from "@/hooks/useSendMessage";
import Spline from "@splinetool/react-spline";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Three3Obj() {
  useSendMessage({
    message: "Hi asus iran",
    icon: "🙌",
    delay: 300,
    duration: 5000,
  });

  useSendMessage({
    message: "Welcome to your customer club",
    icon: "👨",
    delay: 800,
    duration: 4000,
  });

  useSendMessage({
    message: "This small gift is for you, from AZKA NOROUZI",
    icon: "🎁",
    delay: 1500,
    duration: 4000,
  });

  useSendMessage({
    message:
      "You can click on the hamburger menu to login and access the dashboard",
    icon: "🍔",
    delay: 3000,
    duration: 6000,
  });

  return (
    <div
      style={{
        marginTop: "150px",
        position: "absolute",
        scale: 1,
      }}
    >
      <Spline scene="https://prod.spline.design/8eyOhur75-CwIpt9/scene.splinecode" />
    </div>
  );
}
