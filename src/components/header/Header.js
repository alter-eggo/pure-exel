import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/Dom";
import { changeTableName } from "../../redux/actions";
import { debounce } from "../../core/utils";
import { ActiveRoute } from "../../core/router/ActiveRoute";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(event) {
    const value = $(event.target).text();
    this.$dispatch(changeTableName({ value }));
  }

  onClick(event) {
    const action = $(event.target).attr("data-action");
    switch (action) {
      case "delete":
        this.deletePage();
        return;
      case "exit":
        this.exitPage();
        return;
      default:
        return;
    }
  }

  deletePage() {
    const decision = confirm("Вы действительно хотите удалить таблицу");

    if (decision) {
      localStorage.removeItem("excel: " + ActiveRoute.param);
      this.exitPage();
      return;
    }
  }

  exitPage() {
    ActiveRoute.navigate("");
  }

  toHtml() {
    const title = this.store.getState().currentTableName;
    return `<input type="text" class="input" value="${title}" />
    <div>
      <div data-action="delete" class="button">
        <i data-action="delete" class="material-icons">delete</i>
      </div>
      <div data-action="exit" class="button">
        <i data-action="exit" class="material-icons">exit_to_app</i>
      </div>
    </div>`;
  }
}
