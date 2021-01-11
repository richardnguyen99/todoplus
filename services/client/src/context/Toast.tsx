/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";

import {
  ToastContextType,
  ToastOption,
  ToastConfig,
  ContainerPlacement,
  ToastPlacement,
} from "@/types";
import { Toast, ToastContainer } from "@components/Toast";
import { Transition, TransitionGroup } from "react-transition-group";

export const ToastContext = createContext<ToastContextType>({
  add: () => {},
  remove: () => {},
});

const ToastProvider: React.FC = ({ children }) => {
  const [placement, setPlacement] = useState<ContainerPlacement>({
    "bottom-center": [],
    "bottom-right": [],
    "bottom-left": [],
    "top-center": [],
    "top-left": [],
    "top-right": [],
  });

  const generateUEID = (): string => {
    const first = (Math.random() * 46656) | 0;
    const second = (Math.random() * 46656) | 0;

    return (
      `000${first.toString(36)}`.slice(-3) +
      `000${second.toString(36)}`.slice(-3)
    );
  };

  const add = useCallback(
    (header: string, option: ToastOption): void => {
      console.log(placement);
      const p = option.placement || "bottom-right";
      const newToast: ToastConfig = {
        id: option.id || generateUEID(),
        header,
        appearance: option.appearance || "primary",
        placement: p,
        autoDismiss: option.autoDismiss || false,
        autoDismissTimeout: option.autoDismiss
          ? option.autoDismissTimeout || 5000
          : 0,
        content: option.content,
        transitionDuration: option.transitionDuration || 300,
        onDismissCallback: () => {},
      };

      const newPlacement = placement;
      newPlacement[p].push(newToast);

      setPlacement({ ...placement, [p]: newPlacement[p] });
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
      {(Object.keys(placement) as ToastPlacement[]).map((p) => {
        if (placement[p].length === 0) {
          return null;
        }

        return createPortal(
          <ToastContainer placement={p}>
            <TransitionGroup>
              {placement[p].map((t) => (
                <Transition
                  appear
                  key={t.id}
                  mountOnEnter
                  timeout={t.transitionDuration}
                  unmountOnExit
                >
                  {(transitionState): React.ReactElement => (
                    <Toast
                      header={t.header}
                      autoDismiss={t.autoDismiss}
                      autoDismissTimeout={t.autoDismissTimeout}
                      content={t.content}
                      appearance={t.appearance}
                      onDismiss={onDismissToast(t.id)}
                      id={t.id}
                      key={t.id}
                      transitionDuration={t.transitionDuration}
                      transitionState={transitionState}
                    />
                  )}
                </Transition>
              ))}
            </TransitionGroup>
          </ToastContainer>,
          document.body
        );
      })}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
