import { capitalize } from "./utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No $root provided for Dom Listener");
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      this.method = this[method];

      if (!this[method]) {
        const name = this.name || "";
        throw new Error(`Method ${method} is not found in ${name} Component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        const name = this.name || "";
        throw new Error(`Method ${method} is not found in ${name} Component`);
      }

      this.$root.removeListener(listener, this.method);
    });
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}
