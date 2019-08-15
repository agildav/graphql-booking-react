/** Adapter between HTML elements and events with EventTarget */
export interface HTMLElementEvent extends EventTarget {
  target?: HTMLElement;
  value?: any;
}
