import {
  gridPageState,
  isDarkMode,
  subscribeGridPageState,
  subscribeState,
  viewOptionState,
  viewState,
} from "../../../store/store.js";
import { renderGrid } from "./Grid.js";
import { useSubscribeAtom } from "../../../store/coil.js";

export const setGrid = () => {
  renderGrid();

  useSubscribeAtom(gridPageState, renderGrid);
  useSubscribeAtom(isDarkMode, renderGrid);
  useSubscribeAtom(subscribeState, renderGrid);
  useSubscribeAtom(viewOptionState, renderGrid);
  useSubscribeAtom(viewState, renderGrid);
  useSubscribeAtom(subscribeGridPageState, renderGrid);
};
