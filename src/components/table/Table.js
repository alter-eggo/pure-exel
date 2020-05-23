import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { setOnMouseEvents } from "./mouseEvent";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }

  onMousedown(event) {
    return setOnMouseEvents(event, this.$root);
  }

  toHtml() {
    return createTable(20);
  }
}
