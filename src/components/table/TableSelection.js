export class TableSelection {
  static className = "selected";

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.removeFocus();
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
    this.current = $el;
  }

  removeFocus() {
    this.group.forEach((cell) => {
      cell.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  selectGroup($cells = []) {
    this.removeFocus();
    this.group.push(...$cells);
    $cells.forEach((cell) => {
      cell.addClass(TableSelection.className);
    });
  }
}
