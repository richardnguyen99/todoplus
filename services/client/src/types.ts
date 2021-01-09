import { TransitionStatus } from "react-transition-group/Transition";

export type ToastPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps {
  /**
   * Unique id for each Toast component. If an ID
   * is not set when adding, it will be generated
   * by default.
   */
  id?: string;

  /**
   * Main header for displaying a Toast components.
   */
  header: string;

  /**
   * Additional content
   */
  content?: string;

  /**
   * Display of toast components. Default is primary
   */
  appearance?: string;

  /**
   * Inherited dismiss function to delete or remove
   * a Toast component from the context
   */
  onDismiss: () => void;

  /**
   * Automatically dismiss a toast component after
   * the specified period of time
   */
  autoDismiss: boolean;

  /**
   * Specify the time that a Toast component will be
   * removed from the context automatically.
   */
  autoDismissTimeout: number;

  /**
   * Specify the toast component's transition duration
   * time. Important to match with the transition duration
   * in SCSS files.
   */
  transitionDuration: number;

  /**
   * Help Toast component determine which state it's on to
   * animate the transition properly.
   */
  transitionState: TransitionStatus;
}

export interface ToastConfig {
  id?: string;
  content?: string;
  placement?: ToastPlacement;
  autoDismiss?: boolean;
  autoDismissTimeout?: number;
  transtionDuration?: number;
  transitionState: TransitionStatus;
}

export interface ToastContainerProps {
  /**
   * Placement where to put Toast components.
   * Default will be "bottom-right"
   */
  placement?: ToastPlacement;
}

export type ContainerPlacement = Partial<
  Record<ToastPlacement, Array<ToastProps>>
>;

export type ToastContextType = {
  /**
   * Add Toast components to the Toast context
   */
  add: (header: string, options: ToastConfig) => void;

  /**
   * Remove toast components from the Toast context
   */
  remove: (id: string) => void;
};
