/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-bitwise */
import React, { useMemo, useState, useCallback } from "react";
import { Transition } from "react-transition-group";
import { createPortal } from "react-dom";

import ToastContainer from "@components/Toast";

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

const generateUEID = (): string => {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;

  return (
    `000${first.toString(36)}`.slice(-3) + `000${second.toString(36)}`.slice(-3)
  );
};

const sortToastWithPosition = (
  toasts: Array<ToastProps>
): Record<ToastPosition, Array<ToastProps>> => {
  const sortedToasts: Record<ToastPosition, Array<ToastProps>> = {
    "top-left": [],
    "top-center": [],
    "top-right": [],
    "bottom-right": [],
    "bottom-center": [],
    "bottom-left": [],
  };

  toasts.forEach((toast) => {
    sortedToasts[toast.position].push(toast);
  });

  return sortedToasts;
};

export const ToastContext = React.createContext({
  add: (content: string, position: ToastPosition) => {},
  remove: (id: string) => {},
});

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastProps>>([]);

  const add = useCallback(
    (content: string, position: ToastPosition): void => {
      const id = generateUEID();

      setToasts([...toasts, { id, content, position }]);
    },
    [toasts]
  );

  const remove = useCallback(
    (id: string): void => setToasts(toasts.filter((t) => t.id !== id)),
    [toasts]
  );

  const providerValue = useMemo(() => {
    return { add, remove };
  }, [add, remove]);

  return (
    <ToastContext.Provider value={providerValue}>
      {children}
      {Object.keys(sortToastWithPosition(toasts)).map((pos: ToastPosition) => {
        if (sortToastWithPosition(toasts)[pos].length > 0) {
          return createPortal(
            <ToastContainer
              pos={pos}
              toastList={sortToastWithPosition(toasts)[pos]}
            />,
            document.body
          );
        }

        return null;
      })}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
