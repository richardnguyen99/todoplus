/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";

import {
  ToastContextType,
  ToastProps,
  ToastConfig,
  ContainerPlacement,
  ToastPlacement,
} from "@/types";
import { Toast, ToastContainer } from "@components/Toast";

export const ToastContext = createContext<ToastContextType>({
  add: () => {},
  remove: () => {},
});

const ToastProvider: React.FC = ({ children }) => {
  const [placement, setPlacement] = useState<ContainerPlacement>({});

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
      const p = option.placement || "bottom-right";
      const newToast: ToastProps = {
        id: option.id || generateUEID(),
        header,
        autoDismiss: option.autoDismiss || false,
        autoDismissTimeout: option.autoDismiss
          ? option.autoDismissTimeout || 5000
          : 0,
        content: option.content,
        transitionDuration: option.transtionDuration,
        transitionState: option.transitionState,
        onDismiss: () => {},
      };

      const newPlacement = placement;
      newPlacement[option.placement] = [
        ...newPlacement[option.placement],
        newToast,
      ];
      setPlacement(newPlacement);
    },
    [placement]
  );

  const remove = useCallback(
    (id: string): void => {
      // Remove the toast that has the same id
      const newPlacement = placement;

      (Object.keys(newPlacement) as ToastPlacement[]).forEach((p) => {
        newPlacement[p].filter((t) => t.id !== id);
      });

      (Object.keys(newPlacement) as ToastPlacement[]).forEach((p) => {
        if (newPlacement[p].length === 0) {
          delete newPlacement[p];
        }
      });

      setPlacement(newPlacement);
    },
    [placement]
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
      {placement
        ? (Object.keys(placement) as ToastPlacement[]).map((p) =>
            createPortal(
              <ToastContainer placement={p}>
                {placement[p].map((t) => (
                  <Toast
                    header={t.header}
                    autoDismiss={t.autoDismiss}
                    autoDismissTimeout={t.autoDismissTimeout}
                    content={t.content}
                    appearance={t.appearance}
                    onDismiss={onDismissToast(t.id)}
                    id={t.id}
                    key={t.id}
                    transitionDuration={5000}
                    transitionState={t.transitionState}
                  />
                ))}
              </ToastContainer>,
              document.body
            )
          )
        : null}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
