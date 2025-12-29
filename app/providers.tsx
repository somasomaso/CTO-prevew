"use client";

import React from "react";
import { IconContext } from "@phosphor-icons/react";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IconContext.Provider
      value={{
        size: 20,
        weight: "regular",
        color: "currentColor",
      }}
    >
      {children}
    </IconContext.Provider>
  );
}
