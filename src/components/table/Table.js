import { ExcelComponent } from "@/core/ExcelComponent";
import { createTable } from "./table.template";
import { shouldSelectCell, selectCell } from "./cellSelectionFunc";
import { TableSelection } from "./TableSelection";
import { shouldResize, resizeEvent } from "./resizeFunctions";
import { nextSelector } from "./table.functions";
import { $ } from "../../core/Dom";

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

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.$on("formula:keyEnter", () => {
      console.log("key tables", $(this.selection.current).$el);
      this.selection.current.focus();
      // this.selection.current.text = $(this.selection.current.$el.innerText);
    });
  }

  selectCellInTable($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      return resizeEvent(event, this.$root);
    } else if (shouldSelectCell(event)) {
      selectCell(event, this.selection, event.shiftKey, this.$root);
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

  onInput(event) {
    this.$emit("table:input", $(event.target));
  }

  toHtml() {
    return createTable(20);
  }
}
