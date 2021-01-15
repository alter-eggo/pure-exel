import { defaultStyles, defaultTitle } from "../constants";
import { clone } from "../core/utils";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  currentStyles: defaultStyles,
  currentTableName: defaultTitle,
  openDate: "",
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
