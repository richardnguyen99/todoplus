import React from "react";

import { ToastContainerProps, ToastProps } from "@/types";

const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  placement = "bottom-right",
}) => {
  return (
    <div
      className={`tdp-notification-parent tdp-notification-parent${`--${placement}`}`}
    >
      {children}
    </div>
  );
};

const Toast: React.FC<ToastProps> = ({ header, appearance = "default" }) => {
  return (
    <div
      className={`tdp-notification tdp-notification--border tdp-notification${`--${appearance}`}`}
    >
      <div className="tdp-notification__content">
        <header className="tdp-notification__content__header">
          <h4>{header}</h4>
        </header>
      </div>
    </div>
  );
};

export { Toast, ToastContainer };
