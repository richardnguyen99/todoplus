/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useMemo, useCallback } from "react";

import { ToastContextType, ToastProps, ToastConfig } from "@/types";

const ToastContext = createContext<ToastContextType>({
  add: () => {},
  remove: () => {},
});

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const generateUEID = (): string => {
    const first = (Math.random() * 46656) | 0;
    const second = (Math.random() * 46656) | 0;

    return (
      `000${first.toString(36)}`.slice(-3) +
      `000${second.toString(36)}`.slice(-3)
    );
  };

  const add = useCallback(
    (header: string, option: ToastConfig): void => {
      const newToast: ToastProps = {
        id: option.id || generateUEID(),
        header,
        autoDismiss: option.autoDismiss || false,
        autoDismissTimeout: option.autoDismiss
          ? option.autoDismissTimeout || 5000
          : 0,
        placement: option.placement || "bottom-right",
        content: option.content,
        transitionDuration: option.transtionDuration,
        transitionState: option.transitionState,
        onDismiss: () => {},
      };

      setToasts([...toasts, newToast]);
    },
    [toasts]
  );

  const remove = useCallback(
    (id: string): void => {
      // Remove the toast that has the same id
      setToasts(toasts.filter((toast) => toast.id !== id));
    },
    [toasts]
  );

  const onDismissToast = (id: string) => (): void => {
    remove(id);
  };

  const toastMethods = useMemo(() => {
    return { add, remove };
  }, [add, remove]);

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
