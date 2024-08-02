"use client";
import Spline from "@splinetool/react-spline";
import React from "react";

export default function Three3Obj() {
  return (
    <div
      style={{
        marginTop: "150px",
        scale: 1,
      }}
    >
      <Spline scene="https://prod.spline.design/8eyOhur75-CwIpt9/scene.splinecode" />
    </div>
  );
}
