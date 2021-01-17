import { storage } from "../core/utils";

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise((res) => {
      const state = storage(this.name);

      setTimeout(() => {
        res(state);
      }, 1200);
    });
  }
}

function storageName(param) {
  return "excel: " + param;
}
