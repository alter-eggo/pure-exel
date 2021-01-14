import { Excel } from "@/components/excel/excel";
import { Header } from "@/components/header/Header";
import { Formula } from "@/components/formula/Formula";

import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Store } from "@/core/createStore";

import { rootReducer } from "@/redux/rootReducer";
import { storage, debounce } from "@/core/utils";
import { initialState } from "@/redux/initialState";
import { Page } from "../core/Page";

export class ExcelPage extends Page {
  getRoot() {
    console.log("this", this.params);
    const store = new Store(rootReducer, initialState);

    const stateListener = debounce((state) => {
      storage("excel-state", state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    console.log("destryed");
    this.excel.destroy();
  }
}
