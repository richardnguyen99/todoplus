import React from "react";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastProps = {
  id: string;
  position: ToastPosition;
  content: string;
};

interface ToastContainerProps {
  toastList: Array<ToastProps>;
  pos: ToastPosition;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toastList, pos }) => {
  return (
    <div
      className={`tdp-notification-parent tdp-notification-parent${"--".concat(
        pos
      )}`}
    >
      {toastList.map((toast) => (
        <div
          id={toast.id}
          className="tdp-notification tdp-notification--border tdp-notification--success"
        >
          <div className="tdp-notificaition__content">
            <header className="tdp-notification__content__header">
              <h4>{toast.content}</h4>
            </header>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
