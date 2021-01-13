import { ExcelComponent } from "@/core/ExcelComponent";
import { createTable } from "./table.template";
import { shouldSelectCell, selectCell } from "./cellSelectionFunc";
import { TableSelection } from "./TableSelection";
import { shouldResize, handleResize } from "./resizeFunctions";
import { nextSelector } from "./table.functions";
import { $ } from "../../core/Dom";

import * as actions from "@/redux/actions";
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCellInTable(this.$root.find('[data-id="0:0"]'));

    this.$on("formula:input", (value) => {
      this.selection.current.attr("data-value", value).text(parse(value));

      this.updateTextInStore(value);
    });

    this.$on("formula:keyEnter", () => {
      this.selection.current.focus();
    });

    this.$on("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({ value, ids: this.selection.selectedIds })
      );
    });
  }

  selectCellInTable($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));

    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await handleResize(event, this.$root);

      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn("Resize error", error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      void this.resizeTable(event);
    } else if (shouldSelectCell(event)) {
      const $target = $(event.target);

      selectCell(event, this.selection, event.shiftKey, this.$root);
      this.selectCellInTable($target);
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ];
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);

      const $next = this.$root.find(nextSelector(key, id));

      this.selectCellInTable($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onInput(event) {
    const value = $(event.target).text();
    this.updateTextInStore(value);
  }

  toHtml() {
    return createTable(20, this.store.getState());
  }
}
