import { $ } from "../../core/Dom";

export function selectCell(event, selection, isShift, $root) {
  const target = $(event.target);

  isShift ? selectRange(target, selection, $root) : selection.select(target);
}

function selectRange(target, selection, $root) {
  const targetCell = target.id(true);
  const currentCell = selection.current.id(true);

  const cols = range(currentCell.col, targetCell.col);
  const rows = range(currentCell.row, targetCell.row);

  const ids = cols.reduce((acc, col) => {
    rows.forEach((row) => {
      acc.push(`${row}:${col}`);
    });
    return acc;
  }, []);

  const $cells = ids.map((id) => {
    return $root.find(`[data-id="${id}"]`);
  });

  selection.selectGroup($cells);
}

export function shouldSelectCell(event) {
  return Boolean(event.target.dataset.cell);
}

function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill("").map((_, index) => {
    return start + index;
  });
}
