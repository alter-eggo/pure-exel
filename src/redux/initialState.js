import { storage } from "../core/utils";
import { defaultStyles, defaultTitle } from "../constants";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  currentStyles: defaultStyles,
  currentTableName: defaultTitle,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});

const excelState = storage("excel-state");

export const initialState = excelState ? normalize(excelState) : defaultState;
