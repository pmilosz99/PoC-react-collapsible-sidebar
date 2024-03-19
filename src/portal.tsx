import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

export const Portal: React.FC<{ container: HTMLElement | null; children: ReactNode }> = ({ container, children }) => {
  return container ? createPortal(children, container) : null;
};