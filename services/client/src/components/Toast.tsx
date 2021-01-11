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

const Toast: React.FC<ToastProps> = ({
  header,
  appearance = "default",
  transitionState,
}) => {
  const toastRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (toastRef && toastRef.current) {
      if (transitionState === "entering") {
        // toastRef.current.classList.add("notification-enter");
        toastRef.current.style.maxHeight = "0px";
        toastRef.current.style.padding = "0px 20px";
      } else if (transitionState === "entered") {
        // toastRef.current.classList.add("notification-enter");
        toastRef.current.classList.add("notification-enter-active");
        toastRef.current.style.maxHeight = `${
          toastRef.current.scrollHeight + 40
        }px`;

        if (window.innerHeight < 600) {
          toastRef.current.style.padding = "15px";
        } else {
          toastRef.current.style.padding = "20px";
        }
      } else if (transitionState === "exiting") {
        toastRef.current.classList.remove("notificatio-enter-active");
        toastRef.current.classList.add("notification-leave");
      } else if (transitionState === "exited") {
        toastRef.current.classList.remove("notification-leave");
        toastRef.current.classList.add("notification-leave-active");
      }
    }
  }, [transitionState]);

  return (
    <div
      ref={toastRef}
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
