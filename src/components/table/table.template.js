import { toInlineStyles } from "../../core/utils";
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const data = state?.dataState[id] || "";
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return `<div class="cell" 
              data-col="${col}" 
              data-row="${row}"
              data-id="${row}:${col}" 
              data-cell="cell"
              data-value="${data}"
              style="${styles} width: ${getWidth(state.colState || {}, col)}"
              contenteditable>
              ${parse(data || "")}
            </div>`;
  };
}
function toColumn({ col, index, width }) {
  return `<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${col}
          <div class="col-resize" data-resize="col">    
          <div class="col-resize-line"></div>
          </div>
        </div>`;
}

function toRow(content, index, height) {
  const resizer = index
    ? `<div class="row-resize" data-resize="row" data-row="${index}">
        <div class="row-resize-line">
      </div></div>`
    : "";

  return `<div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
  <div class="row-info">${index || ""}
    ${resizer}
  </div>
  <div class="row-data">${content}</div>
  </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function withWidthFrom(state) {
  return function (col, index) {
    return { col, index, width: getWidth(state, index) };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state.colState || {}))
    .map(toColumn)
    .join("");

  rows.push(toRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(toCell(state, row))
      .join("");

    rows.push(toRow(cells, row + 1, getHeight(state.rowState || {}, row)));
  }

  return rows.join("");
}
